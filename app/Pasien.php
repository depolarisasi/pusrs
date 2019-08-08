<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    /**
    * The database table used by the model.
    *
    * @var string
    */
   protected $table = 'pasien2';

   /**
    * The database primary key value.
    *
    * @var string
    */
   protected $primaryKey = 'idpasien';

   /**
    * Attributes that should be mass-assignable.
    *   $table->bigIncrements('idpasien');
    * @var array
    */
   protected $fillable = ['nik', 
   'kd_pasien',
   'nama_pasien', 
   'alamat',
   'kd_kel',
   'nama_kelurahan',
   'kd_kec',
   'nama_kecamatan',
    'umur', 
    'kd_icd',
    'nama_penyakit',
    'kode_faskes',
     'kategori_pasien_wabah',
      'status_layanan',
      'tgl_pelaynan',
      'ns1',
      'hemoglobin',
      'hematokrit',
      'leukosit',
      'trombosit',
      'scan_lab',
       'created_at',
        'updated_at'];
}
