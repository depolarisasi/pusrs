<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class laporanPasien extends Model
{
    /**
    * The database table used by the model.
    * yang digunakan adalah pasien2
    * @var string
    */
   protected $table = 'laporanPasien';

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
   protected $fillable = ['nik_pasien', //NIK PASIEN si yg buat laporan
   'id_pasien', //NIK PASIEN si yg buat laporan
   'typelaporan', // 1 = gigitan nyamuk db
   //2 = positif db
   'latitudelaporan', //koordinat latitude 
   'longitudelaporan', //koordinat longitude
    'created_at', //tanggal laporan
];
}
