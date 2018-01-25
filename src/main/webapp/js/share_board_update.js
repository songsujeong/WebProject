var title=$('#titl');
var creater=$('#name');
var con=$('#con');
var wdt=$('#bw_wdt');
var fileList = $('#fileList');
var mno;
var boardmno;

var no = 0;
var files;
var selDiv = "";
var storedFiles = [];
var delImage = [];
var titlePic
var titleSelectPic;
var beforeTitle
var beforePic = []
var count = 0

$(document).ready(function(){
  $("#header").load("header.html");
  $('#img_upload').on('change', handleFileSelect);

  selDiv = $(".selectedFiles");

  $("body").on("click", ".selFile", removeFile);
});



try {
  no = location.href.split('?')[1].split('=')[1]
} catch (err) {}

$.getJSON('detail.json', {'no': no}, function(result) {
  var data = result.data;
  var currentTitle = result.data.titlePic.split('.')[0]
  beforeTitle = result.data.titlePic
  beforePic = result.data.fileList
  title.text(data.bw_titl);
  con.text(data.bw_con);
  title.attr('data-no', data.no);

  var newFileList = [] // 새롭게 파일을 네이밍 해줄 배열을 만든다.
  for(var i = 0; i < data.fileList.length; i++) {
    // fileName 이라는 이름을 붙여서 파일 이름을 저장한다.
    // ex) fileList
    //        |->{fileName : 공.PNG}
    var temp = data.fileList[i].split('.')[0]
    newFileList[i] = {fileName: temp};
  }

  // 기존의 data아래의 fileList 에 새로 만든 배열값을 넣어준다.
  data.fileList = newFileList;

  // 네이밍된 데이터 값을 확인할 수 있다.
  console.log(data.fileList);
  
  // 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
  var templateFn = Handlebars.compile($('#detail-template').text());
  var generatedHTML = templateFn(result.data);
  var container = $('#fileList');
  var html = container.html()
  container.html(html + generatedHTML);

  titlePic = $('.title_img')
  titlePicF();

  $('#' + currentTitle).parent().addClass('title_select')
});


//file 선택
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

    reader.onload = function (e) {

      var html = "<div class='ShareImgAdd'>" +
      "<img src=\"" + e.target.result + "\" data-file='"+f.name+"' value='"+f.name+"' class='title_img'  title='Click to remove'>" +
      "<p><i class='fa fa-times selFile' aria-hidden='true' value="+ f.name +"></i></p>" +
      "</div>";

      selDiv.append(html);

      titlePic = $('.title_img');
      titlePicF() 
    }
    reader.readAsDataURL(f);
  })
};

function titlePicF() {
  titlePic.click(function() {
    titlePic.parent().removeClass('title_select')
    $(this).parent().addClass('title_select')
  })
}

function removeFile(e) {
  e.preventDefault();
  var file = $(this).attr("value");
  delImage.push(file);
  
  for(var i=0;i<storedFiles.length;i++) {
    if(storedFiles[i].name === file) {
      storedFiles.splice(i,1);

      break;
    }
  }
  console.log(delImage);
  $(this).parent().parent().remove();
}


var index_pic; 

$('#img_upload').fileupload({
  traditional : true,
  url: '/html/boardUpdate.json',        // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.

  add: function(e, data) {
    console.log('add()...');
    count = 1
    data.files = storedFiles
    console.log(data.files);
    $.each(data.files, function (index, file) {
      console.log('Added file: ' + file.name);
    });


    $('#update-btn').click(function() {
      console.log("2")
      if(count != 0){
        if (beforeTitle == $('.title_select').children().attr('value'))
          index_pic = 4
          else {
            for (var i = 0; i < beforePic.length; i++) {
              if(beforePic[i] === $('.title_select').children().attr('value')) {
                index_pic = 5
                break;
              } else
                index_pic = 3

            }
          }
        titleSelectPic = $('.title_select').children().attr('value')

        if(titleSelectPic == undefined){
          alert("대표이미지를 선택해주세요");
        } else {
          data.submit(); // submit()을 호출하면, 서버에 데이터를 보내기 전에 submit 이벤트가 발생한다.
        }
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
    console.log(titleSelectPic);
    // data 객체의 formData 프로퍼티에 일반 파라미터 값을 설정한다.
    data.formData = {
        'mno' : mno,
        'bw_titl': title.val(),
        'bw_con': con.val(),
        'titlePic' : titleSelectPic,
        'no': no,
        'delImage': delImage,
        'indexPic': index_pic
    }
    console.log('submit()...');
  }
});



$('#update-btn').on('click',function() {
  if(count == 0) {
    if (beforeTitle == $('.title_select').children().attr('value')) {
      index_pic = 1
      
    } else {
      for (var i = 0; i < beforePic.length; i++) {
        if(beforePic[i] == $('.title_select').children().attr('value'))
          index_pic = 2
      }
    }
    
    titleSelectPic = $('.title_select').children().attr('value')

    if(titleSelectPic == undefined){
      alert("대표이미지를 선택해주세요");
      
    } else {
      //서버에 배열형태로 데이터를 보내면 전자정부프레임웍의 controller가 배열 데이터를 받지 못하는 경우가 발생하였다.
      //원인은 jQuery 자체의 문제였다 아마도 버그는 아니고 배열데이터 전송에 대한 protype 이 jQuery1.3.x 버젼에서 jQuery1.4.x 버젼으로 올라오면서 바뀐것 같다. 해결 방법은 아래의 코드를 $.post()하기전에 설정하면 된다.
      //jQuery 로 ajax 처리시 data 형식 중 배열(array)값을 넘기려면 다음과 같이 ajax 처리 전 세팅값을 바꿔 주어야 한다.
      jQuery.ajaxSettings.traditional = true,
      $.post('boardUpdate.json', {
        'mno' : mno,
        'bw_titl': title.val(),
        'bw_con': con.val(),
        'titlePic' : titleSelectPic,
        'no': no,
        'delImage': delImage,
        'indexPic': index_pic
      }, function(result) {
        location.href = 'share_board.html';
      })
    }

  }
});

$('#cln-btn').on('click', function(e){
  location.href = 'share_board.html';
})


$.getJSON('userinfo.json', function(result) {
  mno = result.data.no;
})