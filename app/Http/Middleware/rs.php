<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
class rs
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Auth::check() && Auth::user()->role == 1 || Auth::user()->role == 2){
            return $next($request);
            }
            else {
                return redirect('/');
            }
    }
}
