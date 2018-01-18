var Titl = $('#bw_titl'),
Con = $('#bw_con'),
Div = "board",
mno;

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
  $.getJSON('detail.json', {'no': no}, function(result) {
		var data = result.data
		title.text(data.bw_titl)
		con.text(data.bw_con)
		/*title.attr('data-no', data.no)

		var newFileList = [] // 새롭게 파일을 네이밍 해줄 배열을 만든다.
		for(var i = 0; i < data.fileList.length; i++) {
		  // fileName 이라는 이름을 붙여서 파일 이름을 저장한다.
		  // ex) fileList
		  //        |->{fileName : 공.PNG}
		  newFileList[i] = {fileName: data.fileList[i]}
		}
		
		// 기존의 data아래의 fileList 에 새로 만든 배열값을 넣어준다.
		data.fileList = newFileList
		
		// 네이밍된 데이터 값을 확인할 수 있다.
		console.log(data.fileList)
		
	    // 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
		
		var templateFn = Handlebars.compile($('#detail-template').text())
	     var generatedHTML = templateFn(result.data)
	     console.log(result.data)
	     var container = $('#fileList') 
	       container.text('')
	       console.log(container)
	       container.html(generatedHTML)
	*/
	})
});



/*$('#add').on('click', function(e){
	$.post('boardAdd.json', {
	      'mno' : mno,
	      'bw_titl': Titl.val(),
	      'bw_con': Con.val(),
	      'bw_div': Div
	    }, function(result) {
	      location.href = 'share_board.html'
	    }, 'json')
}
})
 */

//------------------------------------------------------------------------->





function handleFileSelect(e) {
  files = e.target.files
  var filesArr = Array.prototype.slice.call(files);
  filesArr.forEach(function(f) {

    if(!f.type.match("image.*")) {
      return;
    }
    storedFiles.push(f);
    console.log(storedFiles)
    var reader = new FileReader();
//  console.log('위쪽FileReader:' + reader.storedFiles);

    reader.onload = function (e) {

      var html = "<div class='ShareImgAdd'>" +
      "<img src=\"" + e.target.result + "\" data-file='"+f.name+"' value='"+f.name+"' class='title_img'  title='Click to remove'>" +
      "<p><i class='selFile' aria-hidden='true' value="+ f.name +"></i></p>" +
      "</div>";

      selDiv.append(html);
      titlePic = $('.title_img')
      titlePic.click(function() {
        titlePic.parent().removeClass('title_select')
        $(this).parent().addClass('title_select')
        titleSelectPic = $('.title_select').children().attr('value')
        console.log('titleSelectPic:' + titleSelectPic)
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


//------------------------------------------------------------------------->

$('#img_upload').fileupload({
  url: '/html/boardAdd.json',        // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.

  add: function(e, data) {
    console.log('add()...');
    data.files = storedFiles
    console.log(data.files);
    $.each(data.files, function (index, file) {
      console.log('Added file: ' + file.name);
  });
    $('#add').click(function() {
      titleSelectPic  = $('.title_select').children().attr('value')
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
    location.href = 'share_board.html'
      console.log('서버갔다옴.')
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


$.getJSON('detail.json', {'no': no}, function(result) {
	  var data = result.data
	  if(no != 0){
		  $('#conupdatebtn').css("display","block")
		  $('#addbtn').css("display","none")
		  $('#conaddbtn').css("display", "none")
	  }
	  console.log(data)
		  
	  Titl.val(data.bw_titl)
    Con.text(data.bw_con)
	  })
  $('#updatebtn').css("display","none")
  $('#conupdatebtn').css("display","none")
  


$('#conupdatebtn').on('click',function() {
	  
	  $.post('conUpdate.json', {
		  'bw_titl': Titl.val(),
		  'bw_con': Con.val(),
		  'no': no,
		  'bw_div': Div
	  }, function(result) {
		  location.href = 'board.html'
	  }, 'json')

});







$('#cln').on('click', function(e){
  location.href = 'share_board.html'
})

$.getJSON('userinfo.json', function(result) {
  mno = result.data.no;
})