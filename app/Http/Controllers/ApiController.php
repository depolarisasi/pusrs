<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Kecamatan;
use App\Kelurahan;
use DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as Image;
use File;
use Response;
use Storage;
use App\Pasien;

class ApiController extends Controller
{
    public function getkec(Request $request){ 
/*
 Cari kecamatan berdasarkan nama
*/
        if ($request->has('q')) {
            $cari = $request->q;
            $data = Kecamatan::where('nama_kecamatan', 'LIKE', "%$cari%")->get();
            return response()->json($data);
        }
    }

/*
 Cari kelurahan berdasarkan kode kecamatan
*/

public function getkel(Request $request){
        $data = Kelurahan::where('kode_kecamatan', $request->kodekecamatan)->pluck('nama_kelurahan', 'kode_kelurahan');
        return response()->json($data);
    }

    public function getkelbyname(Request $request){
        $data = Kelurahan::join('kecamatan','kecamatan.kode_kecamatan','=','kelurahan.kode_kecamatan')
        ->where('kecamatan.nama_kecamatan', $request->kodekecamatan)->pluck('nama_kelurahan', 'kode_kelurahan');

        return response()->json($data);
    }

    
/*
 Upload gambar
*/

    public function apiupload(Request $request)
    {
        if ($request->file('file') == '') {
            $data = ['status' => 0];
        } else {
            $file = $request->file('file');
            $fileArray = ['image' => $file];
            $rules = ['image' => 'mimes:jpeg,jpg,png,gif|required|max:100000'];
            $validator = Validator::make($fileArray, $rules);
            if ($validator->fails()) {
                // Redirect or return json to frontend with a helpful message to inform the user
                // that the provided file was not an adequate type
                $data = ['status' => 3];

                return $data;
            } else {
                // Store the File Now
                // read image from temporary file
                $fileName = time().'.'.$file->getClientOriginalName();
                Image::make($file)->save('temporary/'.$fileName);
                $img_id = mt_rand(1, 10000);
                $data = ['status' => 1, 'img_name' => $fileName, 'img_id' => $img_id];
            }
        }

        return $data; //return status and file name
    }

/*
 Hapus gambar dari folder temporary
*/

    public function apidelete(Request $request)
    {
        if (file_exists('temporary/'.$request->file_name)) {
            Storage::delete('temporary/'.$request->file_name);
            $arr = [['status' => 1]]; //jika sukses return 1
        } else {
            $arr = [['status' => 0]]; //jika gagal return 0
        }

        return $arr;
    }


/*
 API INI DIGUNAKAN DI INDEX DASHBOARD
*/

    public function apiside(Request $request){ //untuk sidebar sebelah peta depan
    
    $data = DB::table('pasien2')
    ->where('pasien2.kd_kec',$request->kode_kec)
    ->join('kelurahan','kelurahan.kode_kelurahan','=','pasien2.kd_kel')
    ->select(DB::raw('nama_kelurahan, count(*) as jumlah'))
    ->groupby('nama_kelurahan')
    
    ->get();
    
    return $data->all();
    }

    public function apitabel(Request $request){ //untuk tabel dibawah peta
    $data2 = Pasien::where('pasien2.kd_kec',$request->kode_kec)
    ->join('kecamatan','kecamatan.kode_kecamatan','=','pasien2.kd_kec')
    ->join('kelurahan','kelurahan.kode_kelurahan','=','pasien2.kd_kel')
    ->join('puskesmas','puskesmas.kode_puskesmas','=','pasien2.kode_faskes')
    ->select('pasien2.*', 'kecamatan.nama_kecamatan','kelurahan.nama_kelurahan', 'puskesmas.nama_puskesmas')
    ->get();
    return $data2->all();
    }
}
