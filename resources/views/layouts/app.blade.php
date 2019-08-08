<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Language" content="en" />
    <meta name="msapplication-TileColor" content="#2d89ef">
    <meta name="theme-color" content="#4188c9">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <link rel="icon" href="./favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico" />
    <!-- Generated: 2018-04-16 09:29:05 +0200 -->
    
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>PUSRS</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=latin-ext">
   
    <!-- Dashboard Core -->
    
    <script src="{{asset('assets/js/vendors/jquery-3.2.1.min.js')}}"></script>
    <script src="{{asset('assets/js/vendors/bootstrap.bundle.min.js')}}"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <link href="{{asset('assets/css/dashboard.css')}}" rel="stylesheet" />
    <!-- Input Mask Plugin -->
    
    @yield('css')
  </head>
  <body class="">
    <div class="page">
      <div class="page-main"> <!-- page-main -->
        <div class="header py-4">
          <div class="container">
            <div class="d-flex">
              <a class="header-brand" href="{{url('/')}}">
               <h3>PUSRS</h3>
              </a>
              <div class="d-flex order-lg-2 ml-auto">
               
                <div class="dropdown">
                  <a href="#" class="nav-link pr-0 leading-none" data-toggle="dropdown">
                    <span class="avatar" style="background-image: url(./demo/faces/female/25.jpg)"></span>
                    <span class="ml-2 d-none d-lg-block">
                      <span class="text-default">{{Auth::user()->name}}</span>
                      <small class="text-muted d-block mt-1">{{Auth::user()->kode_faskes}}</small>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  
                    <a class="dropdown-item" href="{{url('setting')}}">
                      <i class="dropdown-icon fe fe-settings"></i> Setting Profil
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="{{url('docs')}}">
                      <i class="dropdown-icon fe fe-help-circle"></i> Dokumentasi Penggunaan
                    </a>
                    <a class="dropdown-item" href="{{url('logout')}}">
                      <i class="dropdown-icon fe fe-log-out"></i> Keluar
                    </a>
                  </div>
                </div>
              </div>
              <a href="#" class="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
                <span class="header-toggler-icon"></span>
              </a>
            </div>
          </div>
        </div> <!-- header-py-4 -->


        <div class="header collapse d-lg-flex p-0" id="headerMenuCollapse">
          <div class="container">
            <div class="row align-items-center">
             
              <div class="col-lg order-lg-first">
                <ul class="nav nav-tabs border-0 flex-column flex-lg-row">
                  <li class="nav-item">
                    <a href="{{url('/')}}" class="nav-link active"><i class="fe fe-home"></i> Dashboard</a>
                  </li>
                  <li class="nav-item">
                  <a href="javascript:void(0)" class="nav-link" data-toggle="dropdown"><i class="fe fe-box"></i>Pelaporan</a>
                    <div class="dropdown-menu dropdown-menu-arrow">
                    <a href="{{url('laporan/new')}}" class="dropdown-item ">Pelaporan Baru</a>
                  @if(Auth::user()->role == 1 || Auth::user()->role == NULL)
                      <a href="{{url('laporan/upload')}}" class="dropdown-item ">Upload Pelaporan Baru</a>
                    @elseif(Auth::user()->role == 2)
                      <a href="{{url('laporan/upload')}}" class="dropdown-item ">Upload Pelaporan Baru</a>
                    @else
                      <a href="{{url('laporan/')}}" class="dropdown-item ">Semua Laporan</a>
                    @endif
                    </div>
                  </li>
                  <li class="nav-item">
                    <a href="javascript:void(0)" class="nav-link" data-toggle="dropdown"><i class="fe fe-map"></i> Pemetaan</a>
                    <div class="dropdown-menu dropdown-menu-arrow">
                      <a href="{{url('pemetaan/domisili')}}" class="dropdown-item ">Berdasarkan Domisili Pasien</a>
                      <a href="{{url('pemetaan/faskes')}}" class="dropdown-item ">Berdasarkan Faskes</a>
                    </div>
                  </li>
                  
                  <li class="nav-item">
                    <a href="{{url('log')}}" class="nav-link"><i class="fe fe-map"></i> Log Aktivitas</a>
                    
                  </li>
                 
                </ul>
              </div>
            </div>
          </div>
        </div> <!-- /header menu -->

        <div class="my-3 my-md-5">
          <div class="container">
            <div class="page-header">
              <h1 class="page-title">
                Dashboard
              </h1>
            </div>

           @yield('content')


          </div>  <!-- container -->
        </div> <!-- container my-3 -->
      </div> <!-- page-main -->
   
      <footer class="footer">
        <div class="container">
          <div class="row align-items-center flex-row-reverse">
            <div class="col-auto ml-lg-auto">
              <div class="row align-items-center">
                <div class="col-auto">
                  <ul class="list-inline list-inline-dots mb-0">
                    <li class="list-inline-item"><a href="{{url('docs')}}">Dokumentasi</a></li>
                  </ul>
                </div>

              </div>
            </div>
            <div class="col-12 col-lg-auto mt-3 mt-lg-0 text-center">
              Copyright © 2019 <a href=".">PUSRS DINKES KOTA BANDUNG</a>.  All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div> <!-- page -->

    @if (notify()->ready())
 <script type="text/javascript">
swal({
            title: "{!! notify()->option('title') !!}",
            text: "{!! notify()->message() !!}", 
            icon: "{{ notify()->type() }}",
            @if (notify()->option('timer'))
                timer: {{ notify()->option('timer') }},
                showConfirmButton: false
            @endif
        });
 </script>
 @endif

  </body>
</html>