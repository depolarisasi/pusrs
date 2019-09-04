<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LaporanFaskes extends Model
{
    /**
    * The database table used by the model.
    * yang digunakan adalah pasien2
    * @var string
    */
   protected $table = 'laporanfaskes';

   /**
    * The database primary key value.
    *
    * @var string
    */
   protected $primaryKey = 'idlaporan';

   /**
    * Attributes that should be mass-assignable.
    * @var array
    */
   protected $fillable = ['nik_pasien', //NIK PASIEN
   'kd_pasien', //kode unik pasien, KODEFASKES + NIK PASIEN
   'nama_pasien', //nama lengkap pasien
   'alamat', //alamat jalan rumah pasien
   'kd_kel', //kode kelurahan pasien
   'nama_kelurahan', //nama kelurahan pasien
   'kd_kec', //kode kecamatan pasien
   'nama_kecamatan', //nama kelurahan pasien
    'umur', //umur pasien, isinya angka
    'kd_icd', //kode ICD 10 berdasarkan penyakit pasien
    'nama_penyakit', //nama penyakit berdasarkan kode ICD10
    'kode_faskes', //kode fasilitas kesehatan yang menangani pasien
     'kategori_pasien_wabah', //abaikan dahulu
      'status_layanan', //status pasien, apakah sudah dilayani, dll
      'tgl_pelaynan', //tanggal pasien dilayani
      'ns1', // 1 untuk true, null untuk false, true jika pasien didiagnosis menggunakan ns1
      'hemoglobin', //jumlah hemoglobin pasien (integer)
      'hematokrit', //jumlah hematokrit pasien tanpa persen (integer)
      'leukosit', //jumlah leukosit pasien (integer)
      'trombosit', //jumlah trombosit pasien (integer)
      'scan_lab', // berisi array tempat foto hasil lab disimpan
       'created_at',
        'updated_at'];

        public static function getData (){
            $data = LaporanFaskes::join('puskesmas','puskesmas.kode_puskesmas','=','laporanfaskes.kode_faskes')
            ->join('kecamatan','kecamatan.kode_kecamatan','=','laporanfaskes.kd_kec')
            ->join('kelurahan','kelurahan.kode_kelurahan','=','laporanfaskes.kd_kel')
            ->select('puskesmas.nama_puskesmas','laporanfaskes.*', 'kecamatan.nama_kecamatan','kelurahan.nama_kelurahan')
            ->get();
            return $data;
        }
}
