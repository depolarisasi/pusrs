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
    <title>PUSRS</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=latin-ext">
    <script src="{{asset('assets/js/require.min.js')}}"></script>
    <script>
      requirejs.config({
          baseUrl: '.'
      });
    </script>
    <!-- Dashboard Core -->
    <link href="{{asset('/assets/css/dashboard.css')}}" rel="stylesheet" />
    <script src="{{asset('/assets/js/dashboard.js')}}"></script>
    <!-- Input Mask Plugin -->
    <script src="{{asset('/assets/plugins/input-mask/plugin.js')}}"></script>
  </head>
  <body class="">
    <div class="page">
      <div class="page-single">
        <div class="container">
          <div class="row">
            <div class="col col-login mx-auto">
              <div class="text-center mb-6">
                <h2>PUSRS HUB</h2>
              </div>
                    <form class="card" method="POST" action="{{ route('login') }}">
                    @csrf
                <div class="card-body p-6">
                  <div class="card-title">Login Administrasi PUSRS HUB</div>
                  <div class="form-group">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"  name="email" aria-describedby="emailHelp" placeholder="Enter email">
                    @if ($errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif 
                </div>
                  <div class="form-group">
                    <label class="form-label">
                      Password
                      <a href="{{route('password.request')}}" class="float-right small">I forgot password</a>
                    </label>
                    <input type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" placeholder="Password">
                
                    @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>test</strong>
                                    </span>
                                @endif  
                </div>
                  <div class="form-group">
                    <label class="custom-control custom-checkbox">
                      <input class="custom-control-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                      <span class="custom-control-label">Remember me</span>
                    </label>
                  </div>
                  <div class="form-footer">
                    <button type="submit" class="btn btn-primary btn-block">Sign in</button>
                  </div>
                </div>
              </form>
              <div class="text-center text-muted">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
