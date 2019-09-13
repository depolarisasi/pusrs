<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('getkec','ApiController@getkec');

Route::get('getkel/','ApiController@getkel');

Route::get('getkelbyname','ApiController@getkelbyname');

Route::post('upload-lab', 'ApiController@apiupload');

Route::post('delete-lab', 'ApiController@apidelete');


Route::post('apiside/','ApiController@apiside');

Route::post('apitabel/','ApiController@apitabel');

Route::post('register', 'ApiController@register');
Route::post('login', 'ApiController@login');
    Route::get('open', 'ApiController@open');
    Route::group(['middleware' => ['jwt.verify']], function() {
        Route::get('user', 'ApiController@getAuthenticatedUser');
       
    });
    Route::get('allarticle','ApiController@getArticle');
    Route::get('articledetail/{id}','ApiController@getArticleDetails');
    Route::post('addlaporan-pasien', 'ApiController@insertLaporan');
    Route::get('alllaporanpasien','ApiController@getLaporanPasien');
    Route::post ('deletelaporanpasien','Apicontroller@deleteLaporanPasien');
