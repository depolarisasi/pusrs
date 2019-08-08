<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kelurahan extends Model
{
         /**
    * The database table used by the model.
    *
    * @var string
    */
   protected $table = 'kelurahan';

   /**
    * The database primary key value.
    *
    * @var string
    */
   protected $primaryKey = 'idkel';

   /**
    * Attributes that should be mass-assignable.
    * Setiap kelurahan memiliki kode kelurahan dan kode kecamatan tempat kelurahan tersebut
    * @var array
    */
   protected $fillable = ['nama_kelurahan', 'kode_kelurahan', 'kode_kecamatan', 'created_at', 'updated_at'];
}
