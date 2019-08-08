<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes(['verify' => true]);
Route::get('/', 'DashboardController@dashboard')->middleware('auth');
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');


//LOG
Route::get('log','LogController@semuaaktivitas')->middleware('auth');

// Setting
Route::get('setting','UserController@setting')->middleware('auth');

Route::post('setting','UserController@savesSetting')->middleware('auth');

Route::get('setting/password','UserController@settingPassword')->middleware('auth');

Route::post('setting/password','UserController@savePassword')->middleware('auth');


/*/////////////////////////////////////////////////////////////////////
Pemetaan
*/
Route::get('pemetaan','PemetaanController@index')->middleware('auth');
Route::get('pemetaan/kecamatan','PemetaanController@kecamatan')->middleware('auth');
Route::get('pemetaan/kecamatan/{kec_id}','PemetaanController@kecamatandetail')->middleware('auth');
Route::get('pemetaan/faskes/','PemetaanController@faskes')->middleware('auth');


/*/////////////////////////////////////////////////////////////////////
Laporan 
Oleh Puskesmas
*/

Route::get('laporan/','LaporanController@SemuaLaporan')->middleware('auth'); //tampilkan semua laporan
Route::get('laporan/new','LaporanController@LaporanBaru')->middleware('auth'); //tambah 1 laporan
Route::post('laporan/new','LaporanController@SaveLaporanBaru')->middleware('auth'); //proses 1 laporan
Route::get('laporan/detail/{id}','LaporanController@DetailLaporan')->middleware('auth');
Route::get('laporan/edit/{id}','LaporanController@EditLaporan')->middleware('auth'); //ubah 1 laporan
Route::post('laporan/update','LaporanController@UpdateLaporan')->middleware('auth'); //update 1 laporan
Route::get('laporan/delete/{id}','LaporanController@HapusLaporan')->middleware('auth'); //hapus laporan
Route::post('api/laporan/','LaporanController@Api')->middleware('api'); //API LAPORAN

Route::get('laporan/upload','LaporanController@UploadLaporanBaru')->middleware('auth'); //upload laporan
Route::post('laporan/upload','LaporanController@SaveUploadLaporanBaru')->middleware('auth'); //proses laporan