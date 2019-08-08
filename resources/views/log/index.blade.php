@extends('layouts.app')
@section('css')
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" charset="utf-8"></script>

<link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js "></script>
@endsection
@section('content')
<div class="my-3 my-md-5">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Semua Aktivitas</h3>
                   
                  </div>
                  <div class="card-body">
                  
                 <br>
                      <div class="table-responsive">
                  <table id="semualaporan" class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th>Log ID</th>
                <th>Aktivitas</th>
                <th>Pengguna</th>
                <th>Tanggal</th>
            </tr>
        </thead>
        <tbody>
        @foreach($data as $log)
            <tr>
                <td>{{$log->logid}}</td>

                <td>{{$log->log_event}}</td>

                <td>{{$log->name}} ({{$log->kode_faskes}})</td>

                <td>{{$log->created_at}}</td>
                
             
            </tr>
         @endforeach   
        </tbody>
        <tfoot>
            <tr>
              
            <th>Log ID</th>
                <th>Aktivitas</th>
                <th>Pengguna</th>
                <th>Tanggal</th>
            </tr>
        </tfoot>
    </table>
    </div>
                        <script>
                        $(document).ready(function() {
    $('#semualaporan').DataTable();

} );
                        </script>
                    
                 
                </div>
                
</div> <!-- card !-->
            
            </div>

        </div>
      </div>
    </div>
 
@endsection