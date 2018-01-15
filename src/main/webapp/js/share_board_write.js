var Titl = $('#bw_titl'),
    Con = $('#bw_con'),
    Div = "board",
    mno

$(document).ready(function(){
	$("#header").load("header.html")
})

$('#cln').on('click', function(e){
	location.href = 'share_board.html'
})

/*$('#add').on('click', function(e){
	$.post('boardAdd.json', {
	      'mno' : mno,
	      'bw_titl': Titl.val(),
	      'bw_con': Con.val(),
	      'bw_div': Div
	    }, function(result) {
	      location.href = 'share_board.html'
	    }, 'json')
})
*/

$('#share_file').fileupload({
   url: '/html/boardAdd.json',        // 서버에 요청할 URL
   dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
   sequentialUploads: false,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
   singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
   autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
   previewMaxWidth: 340,   // 미리보기 이미지 너비
   previewMaxHeight: 312,  // 미리보기 이미지 높이
   previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
   processalways: function(e, data) {
      console.log('fileuploadprocessalways()...');
      console.log(data.files);
      var imagesDiv = $('.inputfiles');
      imagesDiv.html("");
      try {
         if (data.files[0].preview.toDataURL) {
            $("<img>").attr('src', data.files[0].preview.toDataURL()).css('width', '332.72px').appendTo(imagesDiv);
         }
      } catch (err) {}
      $('#add').click(function() {
         data.submit();
      });
   },
   submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
      data.formData = {
    		  'mno' : mno,
    	      'bw_titl': Titl.val(),
    	      'bw_con': Con.val(),
    	      'bw_div': Div
      }
      console.log('submit()...');
   },
   done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
      console.log(data.result);
      location.href = 'share_board.html'
   }

});


  
$.getJSON('userinfo.json', function(result) {
    mno = result.data.no;
})