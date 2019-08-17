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
                    <h3 class="card-title">Semua Pasien</h3>
                  </div>
                 
                  <div class="card-body">
                  <div class="text-right">
                 <a href="{{url('laporan/new')}}" class="btn btn-md btn-primary">Tambah Pasien</a>
            
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
                
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
        @foreach($data as $pasien)
            <tr>
                <td>{{$pasien->nama_pasien}} ({{$pasien->umur}} tahun)
                <br>NIK : {{$pasien->nik}} </td>

                <td>{{$pasien->alamat}}</td>
                <td> {{$pasien->nama_kecamatan}}</td>
                <td>{{$pasien->nama_kelurahan}}</td>

                <td><a href="{{url('pasien/detail/'.$pasien->idpasien)}}" class="btn btn-info btn-sm"><i class="fe fe-info"></i></a>
                <a href="{{url('pasien/edit/'.$pasien->idpasien)}}" class="btn btn-warning btn-sm"><i class="fe fe-edit"></i></a>
                <a href="{{url('pasien/delete/'.$pasien->idpasien)}}" class="btn btn-danger btn-sm"><i class="fe fe-trash-2"></i></a></td>
            </tr>
         @endforeach   
        </tbody>
      
    </table>
    </div>
                        <script>

                        $(document).ready(function() {
    var table = $('#semualaporan').DataTable();
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