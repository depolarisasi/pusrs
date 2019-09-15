<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RumahSakit;
use App\Puskesmas;
use App\Kecamatan;
use App\Kelurahan;

class FaskesController extends Controller
{
    public function allfaskes(){

        $rumahsakit = RumahSakit::get();
        
        $puskesmas = Puskesmas::get();
        return view('faskes.index')->with(compact('faskes'));
    }
}
