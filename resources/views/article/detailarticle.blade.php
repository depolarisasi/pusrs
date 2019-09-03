@extends('layouts.app')
@section('content')
<div class="my-3 my-md-5">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Detail Artikel</h3>
                  </div>
                 
                  <div class="card-body">
                <h2>{{$detail->judul}}</h2>
                <img src="{{asset($detail->foto)}}" class="img-fluid img-responsive">
                <br>
                <p>Pada tanggal {{$detail->tanggal}}</p>
                <hr>
                {!! $detail->isi !!}
                </div>
                
</div> <!-- card !-->
            
            </div>

        </div>
      </div>
    </div>
 
@endsection