@extends('layouts.app')
@section('css')
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" charset="utf-8"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js
"></script>
<script src="https://cdn.datatables.net/buttons/1.5.6/js/dataTables.buttons.min.js
"></script>

<script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.flash.min.js
"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js
"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js
"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js
"></script>
<script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.html5.min.js
"></script>
<script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.print.min.js
"></script>

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
                    <h3 class="card-title">Semua Laporan</h3>
                  </div>
                  @if(Auth::user()->role == 1 )

                    <div class="row mt-5 ml-3 mr-3">
                      <div class="col-md-3 align-center" id="searchkec">
                      <p>Berdasarkan Kecamatan</p>
                      <select id="searchkecm">
                      <option>--PILIH KECAMATAN--</option>
                      @foreach($kecamatan as $k)
                      <option value="{{$k->nama_kecamatan}}">{{$k->nama_kecamatan}}</option>
                      @endforeach</select>
                      </div>
                      <div class="col-md-3" id="searchpkm">
                      <p>Berdasarkan Puskesmas</p>
                      <select id="searchpusk"></select>
                      </div>
                      <div class="col-md-6" >
                      
<p>Berdasarkan Tanggal</p>
                      <div class="input-group input-daterange">
      <input type="text" id="min-date" class="form-control date-range-filter" data-date-format="dd M yyyy" placeholder="Dari Tanggal : ">
      <input type="text" id="max-date" class="form-control date-range-filter" data-date-format="dd M yyyy" placeholder="Sampai Tanggal :">

    </div>
 
                      </div>
                      @else
                      <div class="row mt-5 ml-3 mr-3">

                      <div class="col-md-6" >
                      
<p>Berdasarkan Tanggal</p>
                      <div class="input-group input-daterange">
      <input type="text" id="min-date" class="form-control date-range-filter" data-date-format="dd M yyyy" placeholder="Dari Tanggal : ">
      <input type="text" id="max-date" class="form-control date-range-filter" data-date-format="dd M yyyy" placeholder="Sampai Tanggal :">

    </div>
 
                      </div>
                    </div>
                    @endif
                  <div class="card-body">
                  <div class="text-right">
                 <a href="{{url('laporan/new')}}" class="btn btn-md btn-primary">Tambah Laporan</a>
                 @if(Auth::user()->role == 1 || Auth::user()->role == 2)
                 <a href="#" class="btn btn-md btn-primary">Upload Laporan</a>
                 @endif

                 </div>
                 <br>
                      <div class="table-responsive">
                  <table id="semualaporan" class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th>Info Pasien</th>
                <th>Alamat</th>
                
                <th class="kecamatan">Kecamatan</th>
                
                <th class="kelurahan">Kelurahan</th>
                <th>Penyakit</th>
                <th class="puskesmas">Faskes</th>
                <th>Tanggal</th>
                
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
        @foreach($data as $pasien)
            <tr>
              @php
              $userDob = $pasien->tanggal_lahir;
              $dob = new DateTime($userDob);
              $now = new DateTime();
              $difference = $now->diff($dob);
              $age = $difference->y;
              @endphp
                <td>{{$pasien->nama_pasien}} ({{$age}} tahun)
                <br>NIK : {{$pasien->nik_pasien}} </td>

                <td>{{$pasien->alamat}}</td>
                <td> {{$pasien->nama_kecamatan}}</td>
                <td>{{$pasien->nama_kelurahan}}</td>

                <td>@if($pasien->kd_icd == "A90")
                DD
                @elseif($pasien->kd_icd == "A91")
               DHF
                @endif</td>

                <td>{{$pasien->nama_puskesmas}}</td>
                <td>{{date('d M Y', strtotime($pasien->created_at))}}</td>
                
                <td><a href="{{url('laporan/detail/'.$pasien->idlaporan)}}" class="btn btn-info btn-sm"><i class="fe fe-info"></i></a>
                <a href="{{url('laporan/edit/'.$pasien->idlaporan)}}" class="btn btn-warning btn-sm"><i class="fe fe-edit"></i></a>
                <a href="{{url('laporan/delete/'.$pasien->idlaporan)}}" class="btn btn-danger btn-sm"><i class="fe fe-trash-2"></i></a></td>
            </tr>
         @endforeach   
        </tbody>
      
    </table>
   
    </div>
                        <script>

                        $(document).ready(function() {
                       var table =   $('#semualaporan').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    } );
    table.columns( '.kecamatan' ).every( function () {
    var that = this;
 
    // Create the select list and search operation
    var select = $('#searchkecm')
        .on( 'change', function () {
            that
                .search( $(this).val() )
                .draw();
        } );
 
    // Get the search data for the first column and add to the select list
    this
        .cache( 'search' )
        .sort()
        .unique()
        .each( function ( d ) {
            select.append( $('<option value="'+d+'">'+d+'</option>') );
        } );
} );


table.columns( '.puskesmas' ).every( function () {
    var that = this;
 
    // Create the select list and search operation
    var select = $('#searchpusk')
        .on( 'change', function () {
            that
                .search( $(this).val() )
                .draw();
        } );
 
    // Get the search data for the first column and add to the select list
    this
        .cache( 'search' )
        .sort()
        .unique()
        .each( function ( d ) {
            select.append( $('<option value="'+d+'">'+d+'</option>') );
        } );
} );
                    $('.btn-danger').on('click', function(e){
                        e.preventDefault(); //cancel default action
                
                        //Recuperate href value
                        var href = $(this).attr('href');
                        var message = $(this).data('confirm');
                        swal({
  title: "Ingin Hapus Laporan?",
  text: "Laporan yang dhapus tidak dapat dikembalikan, aksi ini akan tercatat. Hapus?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Laporan Telah Dihapus", {
      icon: "success",
    });
    window.location.href = href;
  } else {
    swal("Hapus Laporan Dibatalkan", {
      icon: "error",
    });
  }
});
                    });
// Bootstrap datepicker
$('.input-daterange input').each(function() {
  $(this).datepicker('clearDates');
});


// Extend dataTables search
$.fn.dataTable.ext.search.push(
  function(settings, data, dataIndex) {
    var min = $('#min-date').val();
    var max = $('#max-date').val();
    var createdAt = data[6] || 0; // Our date column in the table

    if (
      (min == "" || max == "") ||
      (moment(createdAt).isSameOrAfter(min) && moment(createdAt).isSameOrBefore(max))
    ) {
      return true;
    }
    return false;
  }
);

// Re-draw the table when the a date range filter changes
$('.date-range-filter').change(function() {
  table.draw();
});

$('#my-table_filter').hide();
                    
} );

                        </script>
                    
                 
                </div>
                
</div> <!-- card !-->
            
            </div>

        </div>
      </div>
    </div>
 
@endsection