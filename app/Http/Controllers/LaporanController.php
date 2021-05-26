<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\LaporanFaskes;
use App\Kecamatan;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as Image;
use File;
use Illuminate\Database\QueryException as QE;
use Auth;
use App\Log;
use App\Pasien;
use PDF;
class LaporanController extends Controller
{


//Conditional Logic
/*
* Apakah NIK sudah terdaftar ?
*/
public function checkNIK($nik){
    $pasien = Pasien::where('nik',$nik)->first();
    if($pasien){
            return true;
    }else {
        return false;
    }

}
/*
* Pemilihan kode ICD
* Referensi ICD 10 dari WHO : http://apps.who.int/classifications/apps/icd/icd10online2007/ga90.htm
*/
public function pilihICD($hb, $leukosit, $hematokrit, $trombosit){
 if($leukosit <= 5000 && $trombosit <= 150000 && $trombosit >= 100000 && $hematokrit <= 10){
     return "A91";
 }else {
     return "A90";
 }
}

public function addToLog($idlaporan, $namapasien, $action){
    $log = new Log;
    $log->log_event = "Laporan ".$idlaporan." (".$namapasien.")".$action;
    $log->log_user = Auth::user()->id;
    $log->save();
}

public function addToLogUser($idlaporan, $namapasien, $action){
    $log = new Log;
    $log->log_event = "Pasien ".$idlaporan." (".$namapasien.")".$action;
    $log->log_user = Auth::user()->id;
    $log->save();
}

public function addToPasien($nik, $namapasien, $alamat, $kd_kec, $kd_kel, $tanggallahir ){
    $newpasien = new Pasien;
    $newpasien->nik = $nik;
    $newpasien->nama_pasien = $namapasien;
    $newpasien->alamat = $alamat;
    $newpasien->kd_kel = $kd_kel;
    $newpasien->kd_kec = $kd_kec;
    $newpasien->tanggallahir = $tanggallahir;
    try{
        $this->addToLog($newpasien->idpasien,$newpasien->nama_pasien," Ditambahkan"); //add to log

    $newpasien->save();
    }catch(QE $e){  return $e; } //show db error message

}

    //PUSKESMAS
    public function SemuaLaporan(){
          $kecamatan = Kecamatan::get();
         // $data = [];
         // if(Auth::user()->role == 1){
          $data = LaporanFaskes::join('puskesmas','puskesmas.kode_puskesmas','=','laporanfaskes.kode_faskes')
         ->join('kecamatan','kecamatan.kode_kecamatan','=','laporanfaskes.kd_kec')
         ->join('kelurahan','kelurahan.kode_kelurahan','=','laporanfaskes.kd_kel')
         ->select('puskesmas.nama_puskesmas','laporanfaskes.*', 'kecamatan.nama_kecamatan','kelurahan.nama_kelurahan')
         ->get();
        //  }
         // else if (Auth::user()->role == 2 | Auth::user()->role == 3 ) {
          //    $kodefas = Auth::user()->kode_faskes;
          //    $data = Laporanfaskes::getData($kodefas);
            // comented for presentation purposes
         // }
          return view('laporan.semualaporan',compact('data','kecamatan'));
    }

    public function LaporanBaru(){
        return view('laporan.laporanbaru');
    }

    public function DetailLaporan($id){
         $detail = LaporanFaskes::join('puskesmas','puskesmas.kode_puskesmas','=','laporanfaskes.kode_faskes')
         ->join('kecamatan','kecamatan.kode_kecamatan','=','laporanfaskes.kd_kec')
         ->join('kelurahan','kelurahan.kode_kelurahan','=','laporanfaskes.kd_kel')
         ->select('puskesmas.nama_puskesmas','laporanfaskes.*', 'kecamatan.nama_kecamatan','kelurahan.nama_kelurahan')
         ->where('idlaporan',$id)->first();
         return view('laporan.detaillaporan',compact('detail'));
    }

    public function SaveLaporanBaru(Request $request){
        if($this->checkNIK($request->nik) == false){
            $this->AddToPasien($request->nik,$request->nama_pasien, $request->alamat_pasien, $request->kecamatan, $request->kelurahan, $request->umur_pasien);

        }
        $checkmonth = LaporanFaskes::where('nik_pasien',$request->nik)->whereMonth('created_at','=',date("d",strtotime(date("Y-m-d"))))->first();
        if($checkmonth){

       notify()->error('Kasus Pasien Tersebut Sudah Ada Bulan Ini');
        return redirect('laporan');
    }else {
            $insert = new LaporanFaskes;
            $insert->kd_pasien = Auth::user()->kode_faskes.$request->nik;
            $insert->nik_pasien = $request->nik;
            $insert->nama_pasien = $request->nama_pasien;
            $insert->alamat = $request->alamat_pasien;
            $insert->tanggal_lahir = $request->umur_pasien;
            $insert->kd_kec = $request->kecamatan;
            $insert->kd_kel = $request->kelurahan;
            $insert->kode_faskes = Auth::user()->kode_faskes;
            $insert->kategori_pasien_wabah = Auth::user()->name;

            if($request->pilihanlab == "ns1"){
                $insert->ns1 = $request->hasilns1 == false?0:1; //apakah hasilnya TRUE atau FALSE ?
                if($insert->ns1 == 0){ //kalau False maka tidak terkena dengue
                   notify()->error('Jika NS1 NEGATIF Pasien tidak terjangkit dengue!');
            return redirect()->back();
                }
                $insert->kd_icd = "A90"; //jika true maka dia bisa jadi terkena dengue dengan ICD A90
                } else if($request->pilihanlab = "labdarah"){
                $insert->kd_icd = $this->pilihICD($request->hemoglobin, $request->leukosit, $request->hematokrit, $request->trombosit); //pilih ICD yang sesuai dengan kondisi pasien
                $insert->hemoglobin = $request->hemoglobin;
                $insert->leukosit = $request->leukosit;
                $insert->hematokrit = $request->hematokrit;
                $insert->trombosit = $request->trombosit;
            }

            if($request->per_image_file != ''){
                foreach ($request->per_image_file as $img) { //untuk setiap image yg diupload
                    File::copy('temporary/'.$img, 'hasillab/'.$img); //copy ke hasillab folder
                    if (File::exists('temporary/'.$img)) { //jika ada di temporary
                        File::delete('temporary/'.$img); //delete saja
                    }

           $insert->scan_lab = serialize($request->per_image_file); //masukan ke database dengan cara serialize array
                }
            }


            try{
                $this->addToLog($request->idlaporan,$request->nama_pasien," Ditambahkan"); //add to log
               // $log = new Log;
               // $log->log_event = "Laporan Baru ".$insert->idlaporan." (".$insert->nama_laporanfaskes.")";
               // $log->log_user = Auth::user()->id;
               // $log->save();
                $insert->save();
            }catch(QE $e){  return $e; } //show db error message

           notify()->success('Berhasil ! Laporan berhasil dimasukkan');
                return redirect('laporan');
            }

    }

    public function EditLaporan($id){
        $update = LaporanFaskes::where('idlaporan',$id)->first();
        $edit = LaporanFaskes::join('kecamatan','kecamatan.kode_kecamatan','=','laporanfaskes.kd_kec')
        ->join('kelurahan','kelurahan.kode_kelurahan','=','laporanfaskes.kd_kel')
        ->select('laporanfaskes.*', 'kecamatan.nama_kecamatan','kelurahan.nama_kelurahan')
        ->where('idlaporan',$id)->first();
        if($edit->scan_lab != NULL){
        $unserial = unserialize($edit->scan_lab);

        return view('laporan.ubahlaporan',compact('edit','unserial'));
        }else {

        return view('laporan.ubahlaporan',compact('edit'));
        }
    }

    public function UpdateLaporan(Request $request){
        $insert = LaporanFaskes::where('idlaporan',$request->idlaporan)->first();
        $insert->kd_pasien = Auth::user()->kode_faskes.$request->nik;
        $insert->nik_pasien = $request->nik;
        $insert->nama_pasien = $request->nama_pasien;
        $insert->alamat = $request->alamat_pasien;
        $insert->tanggal_lahir = $request->umur_pasien;
        $insert->kd_kec = $request->kecamatan;
        $insert->kd_kel = $request->kelurahan;
        $insert->kode_faskes = Auth::user()->kode_faskes;
        $insert->kategori_pasien_wabah = Auth::user()->name;

        if($request->pilihanlab == "ns1"){
            $insert->ns1 = $request->hasilns1 == false?0:1;
            if($insert->ns1 == 0){
               notify()->error('Jika NS1 NEGATIF Pasien tidak terjangkit dengue!');
        return redirect()->back();
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
        if ($request->per_image_file != '' || !is_null($request->per_image_file)) { //kalau ada yg diupload lagi
            if (!is_null($request->per_image_file) && count($request->per_image_file) > 0) { //recheck kalo beneran diupload
                foreach ($request->per_image_file as $img) { //untuk setiap image
                    File::copy('temporary/'.$img, 'hasillab/'.$img); //copy dari temporary ke hasillab folder
                    if (File::exists('temporary/'.$img)) { //kalau masih ada temporary
                        File::delete('temporary/'.$img); //hapus
                    }
                }
                if (!is_null($request->per_udah_ada)) { //kalau sudah ada yg diupload sebelumnya
                    $arraybaru = array_merge($request->per_udah_ada, $request->per_image_file); //tambahkan gambar yg baru diupload ke daftar gambar yg sebelumnya
                } else {
                    $arraybaru = $request->per_image_file; //kalau sebelumnya gak ada gambar, masukin gambar baru sebagai gambar
                }
            } else {
                $arraybaru = $request->per_image_file; //kalau ga ada yg diupload, masukin gambar yg lama
            }
        } else {
            $arraybaru = $request->per_udah_ada; //kalau ga ada yg diupload, masukin gambar yg lama
        }
        $insert->scan_lab = serialize($arraybaru); //kalau ga ada yg diupload, masukin gambar yg lama


        try{
            $this->addToLog($request->idlaporan,$request->nama_pasien," Diubah"); //tambahkan ke log
            $insert->update(); //update record lama
        }catch(QE $e){ return $e; } //show db error message

       notify()->success('Berhasil ! Laporan berhasil diubah');

        return redirect()->back();
    }


    public function HapusLaporan($id){
        $hapus = LaporanFaskes::where('idlaporan',$id)->first();
        if($hapus) {
            try{
                $this->addToLog($request->idlaporan,$request->nama_pasien," Dihapus"); //tambahkan ke log
                $hapus->delete(); //delete
            }catch(QE $e){ return $e;}
        }else {

        notify()->error('Data tidak ditemukan!'); //return error jika data tersebut tidak ada di db
        return redirect()->back();
        }

        notify()->success('Laporan berhasil dihapus'); //return to laporan
        return redirect('laporan');
    }
}
