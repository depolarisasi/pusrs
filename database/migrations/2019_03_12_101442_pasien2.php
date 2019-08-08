<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Pasien2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pasien2', function (Blueprint $table) {
            $table->bigIncrements('idpasien');
            $table->string('kd_pasien');
            $table->bigInteger('nik')->unique()->index();
            $table->string('nama_pasien');
            $table->string('kd_kel');
            $table->string('nama_kelurahan');
            $table->string('kd_kec');
            $table->string('nama_kecamatan');
            $table->string('alamat');
            $table->integer('umur');
            $table->string('kd_icd');
            $table->string('nama_penyakit');
            $table->string('kode_puskesmas');
            $table->string('kategori_pasien_wabah');
            $table->integer('status_layanan');
            $table->date('tgl_pelaynan');
            $table->timestamps();
        }
    );
}
    
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
