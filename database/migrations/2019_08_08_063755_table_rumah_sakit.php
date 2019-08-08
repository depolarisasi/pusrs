<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TableRumahSakit extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rumahsakit', function (Blueprint $table) {
            $table->increments('idrs');
            $table->string('nama_rs');
            $table->string('kode_rs');
            $table->string('alamat_rs');
            $table->string('telp_rs');
            $table->decimal('lokasi_lat_rs');
            $table->decimal('lokasi_long_rs');
            $table->timestamps();
          });
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
