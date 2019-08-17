<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Pasien;
use App\Log;

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

        $msg = notify()->flash('Berhasil ! Pasien berhasil ditambahkan', 'success');
            return redirect('pasien')->with(compact('msg'));
            
    }

    public function EditPasien($id){
        $pasien = Pasien::find($id);

        return view('pasien.index')->with(compact('pasien'));
        
    }

    public function UpdatePasien(Request $request){
        $pasien = Pasien::find($id);
        $data = collect($request->all());
        try{
            $this->addToLog("Pasien ". $request->nama_pasien," Ditambahkan"); //add to log
            $pasien->update($data);
        }catch(QE $e){  return $e; } //show db error message

        $msg = notify()->flash('Berhasil ! Pasien berhasil ditambahkan', 'success');
            return redirect('pasien')->with(compact('msg'));
        
    }

    public function DetailPasien($id){
        $pasien = Pasien::find($id);
        $riwayat = LaporanFaskes::where('nik_pasien',$pasien->nik)->get();
        return view('pasien.index')->with(compact('pasien'));
        
    }
}
