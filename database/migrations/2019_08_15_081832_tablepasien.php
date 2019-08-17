<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Tablepasien extends Migration
{
    /**
     * Run the migrations. 
     * @return void
     */
    public function up()
    {
        Schema::create('pasien', function (Blueprint $table) {
            $table->bigInteger('nik')->unique()->index();
            $table->string('nama_pasien');
            $table->string('kd_kel');
            $table->string('kd_kec');
            $table->string('alamat');
            $table->date('tanggallahir');
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
