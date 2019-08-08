<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
          /**
    * The database table used by the model.
    *
    * @var string
    */
   protected $table = 'log_aktivitas';

   /**
    * The database primary key value.
    *
    * @var string
    */
   protected $primaryKey = 'logid';

   /**
    * Attributes that should be mass-assignable.
    *   $table->bigIncrements('idpasien');
    * @var array
    */
   protected $fillable = ['log_event',
   'log_user',
       'created_at',
        'updated_at'];  
}
