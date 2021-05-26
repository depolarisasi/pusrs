<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pasien;
use App\User;
use App\LaporanFaskes;
use DB;
use Carbon\Carbon;

use App\Charts\indexchart;

class DashboardController extends Controller
{
    public function dashboard(){

    $data = DB::table('laporanfaskes')
    ->whereYear('tgl_pelaynan', '=', '2019')

->select(DB::raw('count(kd_kec) as jumlah, kd_kec'))
->groupBy('kd_kec')
->get();
$datasample = array();
foreach($data as $d){
$datasample[$d->kd_kec] =  "$d->jumlah";
}

$dat = json_encode($datasample);

$date = date("Y-m-d");
$thisday= date("d",strtotime(date("Y-m-d")));

$datathisyear = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->get());
$datathismonth = count(LaporanFaskes::whereMonth('tgl_pelaynan', '=', '9')->whereYear('tgl_pelaynan', '=', '2019')->get());
$datathisday = count(LaporanFaskes::whereMonth('tgl_pelaynan', '=', '9')->whereYear('tgl_pelaynan', '=', '2019')->whereDay('tgl_pelaynan', '=', $thisday)->get());

/*
// $januari = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->whereMonth('tgl_pelaynan','=','1')->get());
$februari = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->whereMonth('tgl_pelaynan','=','2')->get());
$maret = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->whereMonth('tgl_pelaynan','=','3')->get());
$april = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->whereMonth('tgl_pelaynan','=','4')->get());
$mei = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->whereMonth('tgl_pelaynan','=','5')->get());
$juni = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->whereMonth('tgl_pelaynan','=','6')->get());
$juli = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->whereMonth('tgl_pelaynan','=','7')->get());
$agustus = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->whereMonth('tgl_pelaynan','=','8')->get());
$september = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->whereMonth('tgl_pelaynan','=','9')->get());
$oktober = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->whereMonth('tgl_pelaynan','=','10')->get());
$november = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->whereMonth('tgl_pelaynan','=','11')->get());
$desember = count(LaporanFaskes::whereYear('tgl_pelaynan', '=', '2019')->whereMonth('tgl_pelaynan','=','12')->get());

$chart = new indexchart;
$chart->labels(['Januari', 'Februari', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',]);
$chart->dataset('Jumlah Kasus Per Bulan', 'bar', [$januari, $februari, $maret, $april, $mei, $juni, $juli, $agustus, $september, $oktober, $november, $desember]);
*/
return view('dashboard')->with(compact('datasample','data','datathismonth','dat','datathisyear','datathisday'));

    }

}
