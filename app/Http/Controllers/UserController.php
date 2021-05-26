<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\User;
use \Illuminate\Database\QueryException as QueryException;
use App\Puskesmas;
use App\RumahSakit;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
class UserController extends Controller
{
    public function setting(){
        $data = User::join('kecamatan', 'kecamatan.kode_kecamatan', '=', 'users.kode_kecamatan')
        ->join('kelurahan', 'kelurahan.kode_kelurahan', '=', 'users.kode_kelurahan')
        ->select('users.*','kecamatan.nama_kecamatan','kelurahan.nama_kelurahan')->where('id',Auth::user()->id)->first();
        if(Auth::user()->role == 2 || Auth::user()->role == 1){
         $detail = Puskesmas::where('kode_puskesmas',Auth::user()->kode_faskes)->first();
        }else if(Auth::user()->role == 3){
         $detail = RumahSakit::where('kode_rs',Auth::user()->kode_faskes)->first();
        }
        return view('setting.index',compact('data','detail'));

    }

    public function settingPassword(){
        $data = User::where('id',Auth::user()->id)->first();
        return view('setting.password',compact('data'));

    }

    public function saveSetting(Request $request){
        $data = User::where('id',Auth::user()->id)->first();
        $edit = collect($request); //ambil semua data
        //$requestz->put('pageslug', Str::slug(substr($request['pagejudul'], 0, 50)));

        $requestData = $edit->all();
        try {
            $data->update($requestData);

        } catch(QueryException $e){

            notify()->error('Oh No! Page tersebut gagal diubah');

            return redirect('setting');
        }

        notify()->success('Berhasil! Page sudah diubah!');

        return redirect('setting');
    }

    public function saveuserpassword(Request $request)
    {
        $passondb = User::where('id', $request->userid)->first();
        $passlama = Hash::make($request->oldpass);
        if (Hash::check($request->oldpass, $passondb->password)) {
            if ($request->newpass1 == $request->newpass2) {
                $newpass = $request->newpass1;
                $passondb->password = Hash::make($newpass);

                try {
                    $passondb->update();
                } catch (QE $e) {
                    notify()->error('Oh No! Perubahan gagal disimpan, coba lagi');

                    return redirect()->back();
                }
            } else {
                notify()->error('Oh No! Perubahan gagal disimpan, password baru tidak cocok');

                return redirect()->back();
            }
        } else {
            notify()->error('Oh No! Perubahan gagal disimpan, password lama tidak cocok');

            return redirect()->back();
        }

        notify()->success('Berhasil! Perubahan berhasil disimpan');

        return redirect()->back();
    }
}
