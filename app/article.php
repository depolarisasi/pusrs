<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class article extends Model
{
   
     /**
    * The database table used by the model.
    *
    * @var string
    */
    protected $table = 'articles';

    /**
     * The database primary key value.
     *
     * @var string
     */
    protected $primaryKey = 'id';
 
    /**
     * Attributes that should be mass-assignable.
     *   
     * Setiap kecamatan memiliki kode kecamatan
     */
    protected $fillable = ['judul', 'isi', 'slug', 'penulis', 'foto', 'thumbnailFoto', 'tanggal', 'created_at', 'updated_at'];
}
