<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Pasien;
use App\Log;
use App\LaporanFaskes;

class PasienController extends Controller
{
//
public function addToLog( $namapasien,$idlaporan, $action){
    $log = new Log;
    $log->log_event = "Laporan ".$idlaporan." (".$namapasien.")".$action;
    $log->log_user = Auth::user()->id;
    $log->save();
}

    public function SemuaPasien(){
        $data = Pasien::join('kecamatan','kecamatan.kode_kecamatan','=','pasien.kd_kec')
        ->join('kelurahan','kelurahan.kode_kelurahan','=','pasien.kd_kel')
        ->select('pasien.*','kelurahan.*','kecamatan.*')
        ->get();

        return view('pasien.semuapasien')->with(compact('data'));

    }

    public function PasienBaru(){
        return view('pasien.pasienbaru');

    }

    public function SavePasienBaru(Request $request){
        $data = collect($request->all());
        try{
            $this->addToLog($request->idpasien,$request->nama_pasien," Ditambahkan"); //add to log
            Pasien::create($data->all());
        }catch(QE $e){  return $e; } //show db error message

        notify()->success('Berhasil ! Pasien berhasil ditambahkan');
            return redirect('pasien');

    }

    public function EditPasien($id){
        $edit = Pasien::join('kecamatan','kecamatan.kode_kecamatan','=','pasien.kd_kec')
        ->join('kelurahan','kelurahan.kode_kelurahan','=','pasien.kd_kel')
        ->select('pasien.*','kelurahan.*','kecamatan.*')
        ->find($id);

        return view('pasien.ubahpasien')->with(compact('edit'));

    }

    public function UpdatePasien(Request $request){
        $pasien = Pasien::find($id);
        $data = collect($request->all());
        try{
            $this->addToLog("Pasien ". $request->nama_pasien," Ditambahkan"); //add to log
            $pasien->update($data);
        }catch(QE $e){  return $e; } //show db error message

        notify()->success('Berhasil ! Pasien berhasil ditambahkan');
            return redirect('pasien');

    }

    public function DetailPasien($id){
        $pasien = Pasien::join('kecamatan','kecamatan.kode_kecamatan','=','pasien.kd_kec')
        ->join('kelurahan','kelurahan.kode_kelurahan','=','pasien.kd_kel')
        ->select('pasien.*','kelurahan.*','kecamatan.*')
        ->find($id);
        $riwayat = LaporanFaskes::where('nik_pasien',$pasien->nik)->get();
        return view('pasien.detailpasien')->with(compact('pasien','riwayat'));

    }

    public function HapusPasien($id){
        $hapus = Pasien::where('idpasien',$id)->first();
        if($hapus) {
            try{
                $this->addToLog($hapus->idpasien,$hapus->nama_pasien," Dihapus"); //tambahkan ke log
                $hapus->delete(); //delete
            }catch(QE $e){ return $e;}
        }else {

        notify()->error('Data tidak ditemukan!'); //return error jika data tersebut tidak ada di db
        return redirect()->back();
        }

        notify()->success('Pasien berhasil dihapus'); //return to laporan
        return redirect('pasien');

    }
}
