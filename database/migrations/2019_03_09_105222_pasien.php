<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Pasien extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pasien', function (Blueprint $table) {
            $table->bigIncrements('idpasien');
            $table->bigInteger('nik')->unique()->index();
            $table->string('nama');
            $table->string('alamat');
            $table->integer('umur');
            $table->integer('kodefaskes');
            $table->integer('statuspenyakit');
            $table->integer('statuslayanan');
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
