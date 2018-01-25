$(document).ready(function(){
	$("#header").load("header.html");
})

var pageNoTag = $('#page-no')  // 매번 이걸 찾으면 안좋다 찾아놓은걸 쓰자
tbody = $('table > tbody'),
prevBtn = $('#prev-btn'),
nextBtn = $('#next-btn'),
currPageNo = $('#page-no'),
pageSize = 10;

var mno;


$('#add-btn').on('click', function(e){
	location.href = 'share_board_write.html';
})


displayList(1);

function displayList(pageNo){
	// 서버에서 강사 목록 데이터를 받아 온다.
	console.log("실행됬다");
//	setTimeout(() => {

	// console.log(pageNo, pageSize)
	$.getJSON('list.json', {'pageNo':pageNo, 'pageSize':pageSize}, function(result) {// url, 서버에 보낼 데이터, 서버에서 받을 함수 비동기 방식

		var totalCount = result.data.totalCount;
		var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1: 0);

		var templateFn = Handlebars.compile($('#tbody-template').text());
		var generatedHTML = templateFn(result.data);
		console.log(">>>>>>>>>>>"+result.data);
		var container = $('#share-container') ;
		container.text('');
		container.html(generatedHTML);  // 문자열 html을 리턴한다.

		console.log(result);

	})
};


$('#logout-btn').on('click', function() {
	location.reload()
	$.getJSON('logout.json', function (result) {
		$('#login-btn').css('display', 'block');
		$('#logout-btn').css('display', 'none');
		$('#join-btn').css('display', 'block');
		$(".login-yn").css("display", "block");
		if (result.status != 'fail') {
			console.log(result);
		}
	});	
});

$('#login-btn').click(function() {
	location.href = 'login.html';
})
$('#join-btn').click(function() {
	location.href = 'join.html';
})


$.getJSON('userinfo.json', function(result) {

	if(result.data != null) {
		mno = result.data.no;
		console.log(result.data.no);
		$("#login-btn").css("display", "none");
		$("#join-btn").css("display", "none");
		$(".login-yn").css("display", "none");

		//사용자가 들어왔을때 서비스 이용가능
		$(document.body).on('click', '#home-img', function(event){
			location.href = 'share_board_detail.html?no=' + $(this).parent().parent().attr('data-no');
			event.preventDefault();
		})
		if(mno != 1) {
			$("#add-btn").css("display", "none");
		}
	} else {
		$("#logout-btn").css("display", "none");
		$("#add-btn").css("display", "none");
		$(".login-yn").css("display", "block");
	}		
})