<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RumahSakit extends Model
{  /**
    * The database table used by the model.
    *
    * @var string
    */
   protected $table = 'rumahsakit';

   /**
    * The database primary key value.
    *
    * @var string
    */
   protected $primaryKey = 'idrs';

   /**
    * Attributes that should be mass-assignable.
    * @var array
    */
   protected $fillable = ['nama_rs',
   'kode_rs',
   'kode_kelurahan', 
   'kode_kecamatan',
   'telp_rs',
   'lokasi_lat_rs',
   'lokasi_long_rs',
       'created_at',
        'updated_at'];  
}
