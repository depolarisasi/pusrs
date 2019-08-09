@extends('layouts.app')
@section('content')
<div class="my-3 my-md-5">
          <div class="container">
            <div class="row">
              <div class="col-md-9">
               
                <form action="{{url('setting/password')}}" id="resetpwform" method="post" class="card">
                  @csrf
                  <input type="hidden" name="userid" value="{{Auth::user()->id}}">
                  <div class="card-header">
                    <h3 class="card-title">Setting Pengguna</h3>
                  </div>
                  <div class="card-body">
                        <div class="form-group">
                          <label class="form-label">Password Lama</label> 
                           <input id="oldpass" type="password" class="form-control" name="oldpass" required >
                        </div>
                        <div class="form-group">
                          <label class="form-label">Password Baru</label>
                          <input id="newpass" type="password" class="form-control" name="newpass1" required >
                        </div>
                        <div class="form-group">
                          <label class="form-label">Konfirmasi Password Baru</label>
                          <input id="newpass2" type="password" class="form-control" name="newpass2" required onkeyup="checkPass(); return false;" >
                          <span id="confirmMessage" class="confirmMessage"></span>
                        </div>
                        
                      
                 
                </div>
                <div class="card-footer text-right">
                  <div class="d-flex">
                   <button id="resetsz" type="submit" class="btn btn-md btn-primary ml-auto">Update</button> 
                  </div>
                </div>
          
            
            </div>

            <div class="col-md-3">
                <div class="card">
                <div class="card-body">
                <center>
                    <a href="{{url('setting/password')}}" class="btn btn-md btn-primary">Ubah Password</a>
                    </center>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <script>
            $(document).ready(function (e) 
            {
              $('#resetsz').attr("disabled","disabled");
            });
          
            function checkPass()
            {
              //store the password field object into variable
              var pass1 = document.getElementById('newpass');
              var pass2 = document.getElementById('newpass2');
          
              var message = document.getElementById('confirmMessage');
          
              var goodColor = "#66cc66";
              var badColor = "#ff6666";
          
              if(pass1.value == pass2.value)
              {
                pass2.style.backgroundColor = goodColor;
                message.style.color = goodColor;
                message.innerHTML = "Passwords Match !"
                document.getElementById('resetsz').className = 'btn btn-md btn-primary ml-auto'
                $('#resetsz').removeAttr("disabled");
              }
              else {
                pass2.style.backgroundColor = badColor;
                message.style.color = badColor;
                message.innerHTML = "Password Do Not Match"
                document.getElementById('resetsz').className = 'btn btn-md btn-primary ml-auto disabled'
                $('#resetsz').attr("disabled","disabled");
                event.preventDefault()
          
              }
            }
          
            $('#resetsz').on("click", function(event) {
              event.preventDefault()
          
              var pass1 = document.getElementById('newpass');
              var pass2 = document.getElementById('newpass2');
          
              var message = document.getElementById('confirmMessage');
          
              var goodColor = "#66c66";
              var badColor = "#ff6666";
              if (pass1.value == pass2.value)
              {
                document.getElementById('resetpwform').submit();
          
              }
              else
              {
                pass2.style.backgroundColor = badColor;
                message.style.color = badColor;
                message.innerHTML = "Password Do Not Match"
              }
            });
          </script>
@endsection