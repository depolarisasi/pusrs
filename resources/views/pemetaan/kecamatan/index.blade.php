@extends('layouts.app')
@section('css')
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" charset="utf-8"></script>

<link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
@endsection
@section('content')
<div class="my-3 my-md-5">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Semua Laporan</h3>
                  </div>
                  <div class="card-body">
                  
                      <div class="table-responsive">
                  <table id="semualaporan" class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th>Kecamatan</th>
                <th>Jumlah Kasus</th>
               
            </tr>
        </thead>
        <tbody>
        @foreach($data as $pasien)
            <tr>
                <td><a href='{{url('pemetaan/kecamatan/'.$pasien->kode_kecamatan)}}'>{{$pasien->nama_kecamatan}}</a></td>

                <td>{{$pasien->jumlah}}</td>
            </tr>
         @endforeach   
        </tbody>
      
    </table>
    </div>
                        <script>

                        $(document).ready(function() {
    var table = $('#semualaporan').DataTable();
                    });
                        </script>
                    
                 
                </div>
                
</div> <!-- card !-->
            
            </div>

        </div>
      </div>
    </div>
 
@endsection