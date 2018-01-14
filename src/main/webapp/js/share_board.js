$(document).ready(function(){
	$("#header").load("header.html")
})


$('#add_btn').on('click', function(e){
	location.href = 'share_board_write.html'
})









$('#login_btn').on('click',function(e) {
	$.post('login2.json', {
		'email': $('#login_email').val(),
		'password': $('#login_pwd').val()
		
	}, function(result) {
		if(result.status=="success")
		{
			console.log("로그인성공..");
			location.href = 'share_board.html'
//				$('.login-link').css('display', 'none');
//			$('.logout-link').css('display', 'block');

			// e.preventDefault();
		} else {
			console.log(result.data)
		}
	}, 'json')
	 e.preventDefault();
})
















var word = $("#keyword");
var mno;

  
var pageNoTag = $('#page-no')  // 매번 이걸 찾으면 안좋다 찾아놓은걸 쓰자
    tbody = $('table > tbody'),
    prevBtn = $('#prev-btn'),
    nextBtn = $('#next-btn'),
    currPageNo = $('#page-no')
    pageSize = 10;

//$("#keyword").keyup(function(){
//
//	displayList2(1);
//	console.log(word.val())
//	if(word.val().length == 0) {
//	
//		displayList(1);
//	}
//})

displayList(1);
function displayList2(pageNo){
	// 서버에서 강사 목록 데이터를 받아 온다.
  $.getJSON('suchList.json', {'pageNo':pageNo, 'pageSize':pageSize , 'keyword':word.val()}, function(result) {// url, 서버에 보낼 데이터, 서버에서 받을 함수 비동기 방식
  var totalCount = result.data.totalCount
  var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1: 0)

  var templateFn = Handlebars.compile($('#tbody-template').text())
  var generatedHTML = templateFn(result.data)
    tbody.text('')
    tbody.html(generatedHTML)  // 문자열 html을 리턴한다.
    
    console.log(result)
    currPageNo = pageNo
    pageNoTag.text(currPageNo)
    if(currPageNo == 1){
      prevBtn.prop('disabled', true)
      prevBtn.addClass("disable")
    } else {
      prevBtn.prop('disabled', false)
      prevBtn.removeClass("disable")
    }

    if(currPageNo == lastPageNo){
      nextBtn.prop('disabled', true)
      nextBtn.addClass("disable")
    } else {
      nextBtn.prop('disabled', false)
      nextBtn.removeClass("disable")
    }
    
  })
}



/*****************************************************/
$('#bord-btn').click(function(){
	if (mno != null) {
	  location.href = 'boardwrite.html'
	} else {
		swal({
			title: "로그인이 필요합니다",
			text: "서비스를 이용하시려면 로그인이 필요합니다.",
			confirmButtonText: "확인",
			confirmButtonColor: "#6384E1",
			html: true
		}, function(isConfirm){
			console.log("isConfirm!!!!!1",isConfirm)
			if(isConfirm == true){
				location.href = "board.html"
			}
		})
			
	}
})









/******************************************************/


var currPageNo = parseInt(pageNoTag.text())
$(document.body).on('click', '.detail-link', function(event){
	location.href = 'view.html?no=' + $(this).attr('data-no')
	event.preventDefault()
})
prevBtn.click(function() {
  displayList(currPageNo - 1)
})

nextBtn.click(function() {
  displayList(currPageNo + 1)
})



$(document).ready(function(){
	$("#header").load("header.html")
})



function displayList(pageNo){
	// 서버에서 강사 목록 데이터를 받아 온다.
  console.log("실행됬다")
//	setTimeout(() => {
		console.log(pageNo, pageSize)
  $.getJSON('list.json', {'pageNo':pageNo, 'pageSize':pageSize}, function(result) {// url, 서버에 보낼 데이터, 서버에서 받을 함수 비동기 방식

	  var totalCount = result.data.totalCount
  console.log(result.data)
  var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1: 0)

  var templateFn = Handlebars.compile($('#tbody-template').text())
  var generatedHTML = templateFn(result.data)
    tbody.text('')
    tbody.html(generatedHTML)  // 문자열 html을 리턴한다.
    
    currPageNo = pageNo
    pageNoTag.text(currPageNo)
    if(currPageNo == 1){
      prevBtn.prop('disabled', true)
      prevBtn.addClass("disable")
    } else {
      prevBtn.prop('disabled', false)
      prevBtn.removeClass("disable")
    }

    if(currPageNo == lastPageNo){
      nextBtn.prop('disabled', true)
      nextBtn.addClass("disable")
    } else {
      nextBtn.prop('disabled', false)
      nextBtn.removeClass("disable")
    }
    
  })
//	}, 1);
}
//displayList(1)

/************************************************/

$(document.body).on('click', '.board', function(event){
	location.href = 'board_detail.html?no=' + $(this).attr('data-no')
	
//	event.preventDefault()
})


	$.getJSON('userinfo.json', function(result) {
		
		if(result.data != null) {
			mno = result.data.no;
		}		
		
	})
