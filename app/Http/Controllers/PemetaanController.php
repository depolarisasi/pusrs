<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pasien;
use App\Kecamatan;
use App\Kelurahan;

class PemetaanController extends Controller
{
    public function index(){
        return view('pemetaan.index');

    }

    public function kecamatan(){
        $data = Pasien::join('kecamatan','kecamatan.kode_kecamatan','=','pasien2.kd_kec')
        ->selectRaw('kecamatan.nama_kecamatan, count(*) as jumlah, kecamatan.kode_kecamatan')
        ->groupby('kecamatan.nama_kecamatan','kecamatan.kode_kecamatan')
        ->get();

        return view('pemetaan.kecamatan.index')->with(compact('data'));

    }

    public function kecamatandetail($kecid){
        return view('pemetaan.kecamatan.detail');
    }

    public function faskes(){
        $data = Pasien::join('puskesmas','puskesmas.kode_puskesmas','=','pasien2.kode_faskes')
        ->selectRaw('puskesmas.nama_puskesmas, count(*) as jumlah, puskesmas.kode_puskesmas')
        ->groupby('puskesmas.nama_puskesmas','puskesmas.kode_puskesmas')
        ->get();
        
        return view('pemetaan.faskes.index')->with(compact('data'));

    }

    
    public function faskesdetail($kecid){
        return view('pemetaan.kecamatan.detail');
    }
 


}
