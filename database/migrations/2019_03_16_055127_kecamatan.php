<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Kecamatan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('kecamatan', function (Blueprint $table) {
            $table->increments('idkec');
            $table->string('nama_kecamatan');
            $table->string('kode_kecamatan');
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
