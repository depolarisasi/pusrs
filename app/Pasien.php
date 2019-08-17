<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    /**
    * The database table used by the model.
    * TABLE PASIEN saja TIDAK DIGUNAKAN
    * yang digunakan adalah pasien2
    * @var string
    */
    protected $table = 'pasien';

    /**
     * The database primary key value.
     *
     * @var string
     */
    protected $primaryKey = 'idpasien';
 
    /**
     * Attributes that should be mass-assignable.
     * @var array
     */
    protected $fillable = ['nik', //NIK PASIEN
    'idpasien', //kode unik pasien, KODEFASKES + NIK PASIEN
    'nama_pasien', //nama lengkap pasien
    'alamat', //alamat jalan rumah pasien
    'kd_kel', //kode kelurahan pasien
    'kd_kec', //kode kecamatan pasien
    'tanggallahir', //umur pasien, isinya angka
        'created_at',
         'updated_at'];
}
