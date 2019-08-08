@extends('layouts.app')
@section('content')
<div class="my-3 my-md-5">
          <div class="container">
            <div class="row">
              <div class="col-md-9">
                <form action="https://httpbin.org/post" method="post" class="card">
                  <div class="card-header">
                    <h3 class="card-title">Setting Pengguna</h3>
                  </div>
                  <div class="card-body">
                 
                        <div class="form-group">
                          <label class="form-label">Nama Pengguna</label>
                          <div class="form-control-plaintext">{{Auth::user()->name}} ({{Auth::user()->email}})</div>
                          <small>Untuk mengubah email harap hubungi administrator</small>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Nama Faskes</label>
                          <div class="form-control-plaintext">{{Auth::user()->nama_faskes}}</div>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Kelurahan Faskes</label>
                          <div class="form-control-plaintext">{{Auth::user()->nama_kelurahan}}</div>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Kecamatan Faskes</label>
                          <div class="form-control-plaintext">{{Auth::user()->nama_kecamatan}}</div>
                        </div>
                       
                       
                        
                    
                 
                </div>
                <div class="card-footer text-right">
                  <div class="d-flex">
                    <a href="javascript:void(0)" class="btn btn-link">Cancel</a>
                    <button type="submit" class="btn btn-primary ml-auto">Update</button>
                  </div>
                </div>
              </form>
            
            </div>

            <div class="col-md-3">
                <div class="card">
                <div class="card-body">
                    
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
 
@endsection