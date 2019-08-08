<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Log;

class LogController extends Controller
{
   public function semuaaktivitas(){
       $data = Log::join('users','users.id', '=','log_aktivitas.log_user')
       ->select('log_aktivitas.*','users.name','users.kode_faskes')->get();
       return view('log.index',compact('data'));
   }
}
