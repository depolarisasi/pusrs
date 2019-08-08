<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kecamatan extends Model
{
     /**
    * The database table used by the model.
    *
    * @var string
    */
   protected $table = 'kecamatan';

   /**
    * The database primary key value.
    *
    * @var string
    */
   protected $primaryKey = 'idkec';

   /**
    * Attributes that should be mass-assignable.
    *   $table->bigIncrements('idpasien');
    * @var array
    */
   protected $fillable = ['nama_kecamatan', 
   'kode_kecamatan',
       'created_at',
        'updated_at'];
}
