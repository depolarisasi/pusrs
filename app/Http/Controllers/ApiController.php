<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Kecamatan;
use App\Kelurahan;
use DB;
use App\User; 
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as Image;
use File;
use Response;
use Storage;
use App\Pasien;
use App\LaporanFaskes;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Hash;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

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
    
    $data = DB::table('laporanfaskes')
    ->where('laporanfaskes.kd_kec',$request->kode_kec)
    ->join('kelurahan','kelurahan.kode_kelurahan','=','laporanfaskes.kd_kel')
    ->select(DB::raw('nama_kelurahan, count(*) as jumlah'))
    ->groupby('nama_kelurahan')
    
    ->get();
    
    return $data->all();
    }

    public function apitabel(Request $request){ //untuk tabel dibawah peta
    $data2 = LaporanFaskes::where('laporanfaskes.kd_kec',$request->kode_kec)
    ->join('kecamatan','kecamatan.kode_kecamatan','=','laporanfaskes.kd_kec')
    ->join('kelurahan','kelurahan.kode_kelurahan','=','laporanfaskes.kd_kel')
    ->join('puskesmas','puskesmas.kode_puskesmas','=','laporanfaskes.kode_faskes')
    ->select('laporanfaskes.*', 'kecamatan.nama_kecamatan','kelurahan.nama_kelurahan', 'puskesmas.nama_puskesmas')
    ->get();
    return $data2->all();
    }

    public $successStatus = 200;
/** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(Request $request){ 


        if (count(DB::Select('select password from users where email = ? ',[$request->email] )) > 0){

        $user = DB::Select('select password from users where email = ? ',[$request->email] );

        $passlama = Hash::check($request->password,$user[0]->password);
            if($passlama){
                $credentials = $request->only('email', 'password');
                $token = JWTAuth::attempt($credentials);
                return response()->json(compact('token'));
            }
            else{
                return response()->json(['error'=>'password salah'], 400); 

            }
        }
        else{
            return response()->json(['error'=>'email salah'], 400); 
        }

        // if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
        //     $user = Auth::user(); 
        //     $success['token'] =  $user->createToken('MyApp')-> accessToken; 
        //     return response()->json(['success' => $success], $this-> successStatus); 
        // } 
        // else{ 
        //     return response()->json(['error'=>'Unauthorised'], 401); 
        // } 


    }
/** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
    { 
        $user = new User ();
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=bcrypt($request->password);
        $user->role="4";
       
        if ($user->save()== true){
            
            $token = JWTAuth::fromUser($user);
return response()->json(['success'=>$token], 200); 
    }
else{
    return response()->json(['error'=>'GABISA!'], 401); 
}}
/** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function details() 
    { 
        $user = Auth::user(); 

        return response()->json(['success' => $user], $this-> successStatus); 
    } 
    public function getAuthenticatedUser()
    {
            try {

                    if (! $user = JWTAuth::parseToken()->authenticate()) {
                            return response()->json(['user_not_found'], 404);
                    }

            } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

                    return response()->json(['token_expired'], $e->getStatusCode());

            } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

                    return response()->json(['token_invalid'], $e->getStatusCode());

            } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

                    return response()->json(['token_absent'], $e->getStatusCode());

            }

            return response()->json(compact('user'));
    }
}
