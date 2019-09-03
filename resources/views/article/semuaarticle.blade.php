@extends('layouts.app')
@section('css')
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" charset="utf-8"></script>

<link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/css/bootstrap-datepicker.css" />
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/js/bootstrap-datepicker.min.js"></script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
@endsection
@section('content')
<div class="my-3 my-md-5">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Semua Artikel</h3>
                  </div>
                 
                  <div class="card-body">
                  <div class="text-right">
                 <a href="{{url('artikel/new')}}" class="btn btn-md btn-primary">Tambah Artikel</a>
            
                 </div>
                 <br>
                      <div class="table-responsive">
                  <table id="semualaporan" class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th>Thumbnail</th>
                <th>Judul</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
        @foreach($article as $articles)
            <tr>
                <td><img src="{{asset($articles->thumbnailFoto)}}" class="img-responsive img-fluid" width="100" height="70"></td>

                <td><a href="">{{$articles->judul}}</a></td>

                <td><a href="{{url('artikel/detail/'.$articles->id)}}" class="btn btn-info btn-sm"><i class="fe fe-info"></i></a>
                <a href="{{url('artikel/edit/'.$articles->id)}}" class="btn btn-warning btn-sm"><i class="fe fe-edit"></i></a>
                <a href="{{url('artikel/delete/'.$articles->id)}}" class="btn btn-danger btn-sm"><i class="fe fe-trash-2"></i></a></td>
            </tr>
         @endforeach   
        </tbody>
      
    </table>
    </div>
                </div>
                
</div> <!-- card !-->
            
            </div>

        </div>
      </div>
    </div>
 
@endsection