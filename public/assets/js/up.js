$(document).ready(function() {
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			
			reader.onload = function (e) {
				var image = new Image();
				image.src = e.target.result;

				image.onload = function() {
					upload_data();
				};
			}
			reader.readAsDataURL(input.files[0]);
		} 
	}
	var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];    
	function ValidateSingleInput(oInput) {
		if (oInput.type == "file") {
			var sFileName = oInput.value;
			if (sFileName.length > 0) {
				var blnValid = false;
				for (var j = 0; j < _validFileExtensions.length; j++) {
					var sCurExtension = _validFileExtensions[j];
					if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
						blnValid = true;
						break;
					}
				}
				if (!blnValid) {
					alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
					oInput.value = "";
					return false;
				}
			}
		}
		return true;
	}
	$("#image_file").change(function(){
		var image = document.getElementById('image_file');
		if(ValidateSingleInput(this)){
			readURL(this);
		}
		
	});

	var href = location.protocol + '//' + location.host;
	function upload_data(){
			var file_upl = $('#image_file')[0].files[0];
			name = file_upl.name;
			size = file_upl.size;
			type = file_upl.type;
			if(file_upl.name.length > 1){
				var formData = new FormData();
				formData.append('file', file_upl);
				$.ajax({
					   url : '/api/upload-lab',
					   type : 'POST',
					   data : formData,
					   _token:"{{csrf_token()}}",
					   processData: false,  // tell jQuery not to process the data
					   contentType: false,  // tell jQuery not to set contentType
						beforeSend: function() {
							$('#loading_upload').show();
						},
						complete: function(){
							$('#loading_upload').hide();
							var image = document.getElementById('image_file');
							image.value='';
						},
						success : function(data) {
							var ret_value = data;
							if(ret_value.status == 1){
								
								// if( $('#img-wrapper-upload').hasClass('m-catatan-add') ){
	
	 $('.rqubtn').before('<div class="m-img-wrapper" id="col'+ret_value.img_id+'"> <img src="'+href+"/temporary/"+ret_value.img_name+'" class="img-fluid" />  <a style="cursor:pointer;" class="gux" id="act'+ret_value.img_id+'">X</a> <input type="hidden" value="'+ret_value.img_name+'" name="per_image_file[]" /> </div> '); 
								// }else{
	
								//  $('#img-wrapper-upload').append('<div class="col-sm-4" id="col'+ret_value.img_id+'"> <img src="'+ret_value.file_ret_value.image_directory+'" width="100%" /> <div style="position:absolute; top:0; height:0;"> <a style="cursor:pointer;" id="act'+ret_value.img_id+'">X</a> <input type="hidden" value="'+ret_value.img_name+'" name="per_image_file[]" /> </div> </div> '); 
								// }
								var image_name=ret_value.img_name;
								var id_name=ret_value.img_id;

								$('#act'+ret_value.img_id).click(function(){
									delete_image(id_name,image_name);
								});
							}else{
							
swal({
	title: "Gagal",
	text: "Silahkan cek kembali ukuran / jenis file yg di upload, ukuran tidak boleh melebihi 3 MB", 
	icon: "alert",
	
		timer: 5000,
		showConfirmButton: true
	
});
							}
						}
				});
			}
		} 


	function delete_image(id_name,image_name){
		$('#col'+id_name).remove();
		$.ajax({
			url : '/api/delete-lab',
			type : 'POST',
			data : 
			file_name=image_name,
			_token:"{{csrf_token()}}",
			processData: false,  // tell jQuery not to process the data
			contentType: false,  // tell jQuery not to set contentType
			success : function(data) {
				console.log(data);
			} 
		});
	}
	$(document).on("submit", "form", function(event){
			window.onbeforeunload = null;
	});
	$('#btn_batal').click(function(){
		window.onbeforeunload = null;
		document.location='/';
	});
	
	$('.act_ext_del').click(function(){
		value_id=$(this).attr('data-item');
		$('#col'+value_id).remove();
		$('#img-wrapper-upload').append('<input type="hidden" name="del_per_image_file[]" value="'+value_id+'" />');
	});
	
    
});

