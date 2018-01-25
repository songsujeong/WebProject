var Titl = $('#bw_titl');
var Con = $('#bw_con');
var Div = "board";
var mno;

var files;
var selDiv = "";
var storedFiles = [];
var titlePic
var titleSelectPic;



$(document).ready(function(){
	$("#header").load("header.html");
	$('#img_upload').on('change', handleFileSelect);

	selDiv = $(".selectedFiles");
  $("body").on("click", ".selFile", removeFile);
});


function handleFileSelect(e) {
	files = e.target.files
	var filesArr = Array.prototype.slice.call(files);
	filesArr.forEach(function(f) {

		if(!f.type.match("image.*")) {
			return;
		}
		storedFiles.push(f);
		console.log(storedFiles);
		var reader = new FileReader();
//		console.log('위쪽FileReader:' + reader.storedFiles);

		reader.onload = function (e) {

		  var html = "<div class='ShareImgAdd'>" +
      "<img src=\"" + e.target.result + "\" data-file='"+f.name+"' value='"+f.name+"' class='title_img'  title='Click to remove'>" +
      "<p><i class='fa fa-times selFile' aria-hidden='true' value="+ f.name +"></i></p>" +
      "</div>";


			selDiv.append(html);
			titlePic = $('.title_img');
			titlePic.click(function() {
				titlePic.parent().removeClass('title_select');
				$(this).parent().addClass('title_select');
				titleSelectPic = $('.title_select').children().attr('value');
				console.log('titleSelectPic:' + titleSelectPic);
			})

		}
		reader.readAsDataURL(f);
	});

}

function removeFile(e) {
  e.preventDefault();
  var file = $(this).attr("value");
  for(var i=0;i<storedFiles.length;i++) {
    if(storedFiles[i].name === file) {
      storedFiles.splice(i,1);

      break;
    }
  }
  console.log(storedFiles)
  $(this).parent().parent().remove();
}



$('#img_upload').fileupload({
	url: '/html/boardAdd.json',        // 서버에 요청할 URL
	dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.

	add: function(e, data) {
		console.log('add()...');
		data.files = storedFiles;
		console.log(data.files);
		$.each(data.files, function (index, file) {
			console.log('Added file: ' + file.name);
		});
		$('#add').click(function() {
			titleSelectPic  = $('.title_select').children().attr('value');
			if(titleSelectPic == undefined){
				alert("대표이미지를 선택해주세요")
			} else {
				data.submit(); // submit()을 호출하면, 서버에 데이터를 보내기 전에 submit 이벤트가 발생한다.
			}
		});
	},

	done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
		console.log('done()...');
		console.log(data.result);
		location.href = 'share_board.html';
		console.log('서버갔다옴.');
	},
	submit: function (e, data) {
		console.log('submit()...');
		console.log(titleSelectPic)
		// data 객체의 formData 프로퍼티에 일반 파라미터 값을 설정한다.
		data.formData = {
			'mno' : mno,
			'bw_titl': Titl.val(),
			'bw_con': Con.val(),
			'bw_div': Div,
			'titlePic' : titleSelectPic
		}
		console.log('submit()...');
	}
});



$('#cln').on('click', function(e){
	location.href = 'share_board.html';
})

$.getJSON('userinfo.json', function(result) {
	mno = result.data.no;
})