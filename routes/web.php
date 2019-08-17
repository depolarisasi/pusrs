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

Auth::routes(['verify' => true]); //email verification route
Route::get('/', 'DashboardController@dashboard')->middleware('auth'); //dashboard index
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout'); //log out


/*/////////////////////////////////////////////////////////////////////
LOG
*//////////////////////////////////////////////////////////////////////
Route::get('log','LogController@semuaaktivitas')->middleware('auth'); //route untuk halaman semua logs


/*/////////////////////////////////////////////////////////////////////
Pemetaan
*//////////////////////////////////////////////////////////////////////
Route::get('setting','UserController@setting')->middleware('auth'); //halaman user setting
Route::post('setting','UserController@savesSetting')->middleware('auth'); //save setting user
Route::get('setting/password','UserController@settingPassword')->middleware('auth'); //halaman ubah password
Route::post('setting/password','UserController@saveuserpassword')->middleware('auth'); //save password setelah diubah


/*/////////////////////////////////////////////////////////////////////
Pemetaan
*//////////////////////////////////////////////////////////////////////
Route::get('pemetaan','PemetaanController@index')->middleware('auth');
Route::get('pemetaan/kecamatan','PemetaanController@kecamatan')->middleware('auth');
Route::get('pemetaan/kecamatan/{kec_id}','PemetaanController@kecamatandetail')->middleware('auth');
Route::get('pemetaan/faskes/','PemetaanController@faskes')->middleware('auth');


/*/////////////////////////////////////////////////////////////////////
Laporan 
Oleh Puskesmas
*//////////////////////////////////////////////////////////////////////

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




/*/////////////////////////////////////////////////////////////////////
Laporan 
Oleh Rumah Sakit
*//////////////////////////////////////////////////////////////////////

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


/*/////////////////////////////////////////////////////////////////////
Pasien
*//////////////////////////////////////////////////////////////////////

Route::get('pasien/','PasienController@SemuaPasien')->middleware('auth'); //tampilkan semua Pasien
Route::get('pasien/new','PasienController@PasienBaru')->middleware('auth'); //tambah 1 Pasien
Route::post('pasien/new','PasienController@SavePasienBaru')->middleware('auth'); //proses 1 Pasien
Route::get('pasien/detail/{id}','PasienController@DetailPasien')->middleware('auth');
Route::get('pasien/edit/{id}','PasienController@EditPasien')->middleware('auth'); //ubah 1 Pasien
Route::post('pasien/update','PasienController@UpdatePasien')->middleware('auth'); //update 1 Pasien
Route::get('pasien/delete/{id}','PasienController@HapusPasien')->middleware('auth'); //hapus Pasien
Route::post('api/pasien/','PasienController@Api')->middleware('api'); //API Pasien

Route::get('pasien/upload','PasienController@UploadPasienBaru')->middleware('auth'); //upload Pasien
Route::post('pasien/upload','PasienController@SaveUploadPasienBaru')->middleware('auth'); //proses Pasien
