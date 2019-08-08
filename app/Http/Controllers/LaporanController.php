<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pasien;
use App\Kecamatan;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as Image;
use File;
use Illuminate\Database\QueryException as QE;
use Auth;
use App\Log;

class LaporanController extends Controller
{
//Conditional Logic

public function checkNIK($nik){
    $pasien = Pasien::where('nik',$nik)->first();
    if($pasien){
            return true;
    }else {
        return false;
    }

}

public function pilihICD($hb, $leukosit, $hematokrit, $trombosit){
 if($leukosit <= 5000 && $trombosit <= 150000 && $trombosit >= 100000 && $hematokrit <= 10){
     return "A90";
 }else {
     return "A91";
 }
}


    //PUSKESMAS
    public function SemuaLaporan(){
        $kecamatan = Kecamatan::get();
        $data = Pasien::join('puskesmas','puskesmas.kode_puskesmas','=','pasien2.kode_faskes')
        ->join('kecamatan','kecamatan.kode_kecamatan','=','pasien2.kd_kec')
        ->join('kelurahan','kelurahan.kode_kelurahan','=','pasien2.kd_kel')
        ->select('puskesmas.nama_puskesmas','pasien2.*', 'kecamatan.nama_kecamatan','kelurahan.nama_kelurahan')
        ->get();
        return view('laporan.semualaporan',compact('data','kecamatan'));
    }

    public function LaporanBaru(){
        return view('laporan.laporanbaru');
    }

    public function DetailLaporan($id){
        $detail = Pasien::join('puskesmas','puskesmas.kode_puskesmas','=','pasien2.kode_faskes')
        ->join('kecamatan','kecamatan.kode_kecamatan','=','pasien2.kd_kec')
        ->join('kelurahan','kelurahan.kode_kelurahan','=','pasien2.kd_kel')
        ->select('puskesmas.nama_puskesmas','pasien2.*', 'kecamatan.nama_kecamatan','kelurahan.nama_kelurahan')
        ->where('idpasien',$id)->first();
        return view('laporan.detaillaporan',compact('detail'));
    }

    public function SaveLaporanBaru(Request $request){
        if($this->checkNIK($request->nik) == false){
            $insert = new Pasien;
            $insert->kd_pasien = Auth::user()->kode_faskes.$request->nik;
            $insert->nik = $request->nik;
            $insert->nama_pasien = $request->nama_pasien;
            $insert->alamat = $request->alamat_pasien;
            $insert->umur = $request->umur_pasien;
            $insert->kd_kec = $request->kecamatan;
            $insert->kd_kel = $request->kelurahan;
            $insert->kode_faskes = Auth::user()->kode_faskes;
            $insert->kategori_pasien_wabah = Auth::user()->name;

            if($request->pilihanlab == "ns1"){
                $insert->ns1 = $request->hasilns1 == false?0:1;
                if($insert->ns1 == 0){
                    $msg = notify()->flash('Jika NS1 NEGATIF Pasien tidak terjangkit dengue!', 'error');
            return redirect()->back()->with(compact('msg'));
                }
                $insert->kd_icd = "A90";
            }else if($request->pilihanlab = "labdarah"){
                $insert->kd_icd = $this->pilihICD($request->hemoglobin, $request->leukosit, $request->hematokrit, $request->trombosit);
                $insert->hemoglobin = $request->hemoglobin;
                $insert->leukosit = $request->leukosit;
                $insert->hematokrit = $request->hematokrit;
                $insert->trombosit = $request->trombosit;
            }

            if($request->per_image_file != ''){
                foreach ($request->per_image_file as $img) {
                    File::copy('temporary/'.$img, 'hasillab/'.$img);
                    if (File::exists('temporary/'.$img)) {
                        File::delete('temporary/'.$img);
                    }
                    
           $insert->scan_lab = serialize($request->per_image_file);
                }
    
            }

            try{
                $log = new Log;
                $log->log_event = "Laporan Baru ".$insert->idpasien." (".$insert->nama_pasien.")";
                $log->log_user = Auth::user()->id;
                $log->save();
                $insert->save();
            }catch(QE $e){
                return $e;
            }
            $msg = notify()->flash('Berhasil ! Laporan berhasil dimasukkan', 'success');
                return redirect('laporan')->with(compact('msg'));
        }else {
            
        $msg = notify()->flash('Pasien tersebut sudah pernah di input !', 'error');
            return redirect()->back()->with(compact('msg'));
        }

    }

    public function EditLaporan($id){
        $update = Pasien::where('idpasien',$id)->first();


        $edit = Pasien::join('kecamatan','kecamatan.kode_kecamatan','=','pasien2.kd_kec')
        ->join('kelurahan','kelurahan.kode_kelurahan','=','pasien2.kd_kel')
        ->select('pasien2.*', 'kecamatan.nama_kecamatan','kelurahan.nama_kelurahan')
        ->where('idpasien',$id)->first();
        if($edit->scan_lab != NULL){
        $unserial = unserialize($edit->scan_lab);
        
        return view('laporan.ubahlaporan',compact('edit','unserial'));
        }else {
            
        return view('laporan.ubahlaporan',compact('edit'));
        }
    }

    public function UpdateLaporan(Request $request){
        $insert = Pasien::where('idpasien',$request->idpasien)->first();
        $insert->kd_pasien = Auth::user()->kode_faskes.$request->nik;
        $insert->nik = $request->nik;
        $insert->nama_pasien = $request->nama_pasien;
        $insert->alamat = $request->alamat_pasien;
        $insert->umur = $request->umur_pasien;
        $insert->kd_kec = $request->kecamatan;
        $insert->kd_kel = $request->kelurahan;
        $insert->kode_faskes = Auth::user()->kode_faskes;
        $insert->kategori_pasien_wabah = Auth::user()->name;

        if($request->pilihanlab == "ns1"){
            $insert->ns1 = $request->hasilns1 == false?0:1;
            if($insert->ns1 == 0){
                $msg = notify()->flash('Jika NS1 NEGATIF Pasien tidak terjangkit dengue!', 'error');
        return redirect()->back()->with(compact('msg'));
            }else {
                if($insert->kd_icd == "A91"){
            $insert->kd_icd = "A91";}
            else {
                $insert->kd_icd = "A90";
            }
            }
        }else if($request->pilihanlab = "labdarah"){
            $insert->kd_icd = $this->pilihICD($request->hemoglobin, $request->leukosit, $request->hematokrit, $request->trombosit);
            $insert->hemoglobin = $request->hemoglobin;
            $insert->leukosit = $request->leukosit;
            $insert->hematokrit = $request->hematokrit;
            $insert->trombosit = $request->trombosit;
            $insert->ns1 = null;
        }
        if ($request->per_image_file != '' || !is_null($request->per_image_file)) {
            if (!is_null($request->per_image_file) && count($request->per_image_file) > 0) {
                foreach ($request->per_image_file as $img) {
                    File::copy('temporary/'.$img, 'hasillab/'.$img);
                    if (File::exists('temporary/'.$img)) {
                        File::delete('temporary/'.$img);
                    }
                }
                if (!is_null($request->per_udah_ada)) {
                    $arraybaru = array_merge($request->per_udah_ada, $request->per_image_file);
                } else {
                    $arraybaru = $request->per_image_file;
                }
            } else {
                $arraybaru = $request->per_image_file;
            }
        } else {
            $arraybaru = $request->per_udah_ada;
        }


      
        $insert->scan_lab = serialize($arraybaru);

       
        try{
            $log = new Log;
                $log->log_event = "Laporan ".$insert->idpasien." (".$insert->nama_pasien.") Diubah";
                $log->log_user = Auth::user()->id;
                $log->save();
            $insert->update();
        }catch(QE $e){
            return $e;
        }
        $msg = notify()->flash('Berhasil ! Laporan berhasil diubah', 'success');
            return redirect()->back()->with(compact('msg'));
    }


    public function HapusLaporan($id){
        $hapus = Pasien::where('idpasien',$id)->first();
        if($hapus) {
            try{
                $log = new Log;
                $log->log_event = "Laporan ".$hapus->idpasien." (".$hapus->nama_pasien.") Dihapus";
                $log->log_user = Auth::user()->id;
                $log->save();
                $hapus->delete();
            }catch(QE $e){
                return $e;
            }
        }else {
                   
        $msg = notify()->flash('Data tidak ditemukan!', 'error');
        return redirect()->back()->with(compact('msg'));
        }
        
        $msg = notify()->flash('Laporan berhasil dihapus', 'success');
        return redirect('laporan')->with(compact('msg'));
    }
}
