<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\User;
use \Illuminate\Database\QueryException as QueryException;
class UserController extends Controller
{
    public function setting(){
        $data = User::join('kecamatan', 'kecamatan.kode_kecamatan', '=', 'users.kode_kecamatan')
        ->join('kelurahan', 'kelurahan.kode_kelurahan', '=', 'users.kode_kelurahan')
        ->select('users.*','kecamatan.nama_kecamatan','kelurahan.nama_kelurahan')->where('id',Auth::user()->id)->first();
        return view('setting.index',compact('data'));

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

            $msg = notify()->flash('Oh No! Page tersebut gagal diubah', 'alert');

            return redirect('adminx/page')->with('msg', $msg);
        }

        $msg = notify()->flash('Berhasil! Page sudah diubah!', 'success');

        return redirect('adminx/page')->with('msg', $msg);
    }
}
