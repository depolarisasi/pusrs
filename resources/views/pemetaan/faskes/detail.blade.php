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
                    <h3 class="card-title">Detail Laporan</h3>

                  </div>
                  <div class="card-body">
                   <div id="chart-wrapper" style="height: 16rem"></div>
          <script>
require(['c3', 'jquery'], function(c3, $) {
  $(document).ready(function(){
    var chart = c3.generate({
      bindto: '#chart-wrapper', // id of chart wrapper
      data: {
        columns: [
            // each columns data
          ['data1', 7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
          ['data2', 3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        ],
        labels: true,
        type: 'line', // default type of chart
        colors: { 
          'data1': tabler.colors["blue"],
          'data2': tabler.colors["green"]
        },
        names: {
            // name of each serie
          'data1': 'Tokyo',
          'data2': 'London'
        }
      },
      axis: {
        x: {
          type: 'category',
          // name of each category
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
      },
      legend: {
                show: false, //hide legend
      },
      padding: {
        bottom: 0,
        top: 0
      },
    });
  });
});
</script>
                    
                 
                </div>
                
</div> <!-- card !-->
            
            </div>

        </div>
      </div>
    </div>
 
@endsection