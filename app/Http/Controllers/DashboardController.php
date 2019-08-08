<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pasien;
use App\User;
use DB;

class DashboardController extends Controller
{
    public function dashboard(){

    $data = DB::table('pasien2')
    
->select(DB::raw('count(kd_kec) as jumlah, kd_kec'))
->groupBy('kd_kec')
->get();
$datasample = array();
foreach($data as $d){
$datasample[$d->kd_kec] =  "$d->jumlah";
}

$dat = json_encode($datasample);
return view('dashboard',compact("dat","data"));

    }
    
}
