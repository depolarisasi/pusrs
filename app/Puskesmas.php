<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Puskesmas extends Model
{
           /**
    * The database table used by the model.
    *
    * @var string
    */
   protected $table = 'puskesmas';

   /**
    * The database primary key value.
    *
    * @var string
    */
   protected $primaryKey = 'idpus';

   /**
    * Attributes that should be mass-assignable.
    * @var array
    */
   protected $fillable = ['nama_puskesmas',
   'kode_puskesmas',
   'kode_kelurahan', 
   'kode_kecamatan',
       'created_at',
        'updated_at'];  
}
