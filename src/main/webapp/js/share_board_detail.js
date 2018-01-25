$(document).ready(function(){
	$("#header").load("header.html")
})

var title=$('#titl');
var creater=$('#name');
var con=$('#con');
var wdt=$('#bw_wdt');
var fileList = $('#fileList');
var mno;
var boardmno;

var no = 0;

try {
	no = location.href.split('?')[1].split('=')[1]
} catch (err) {};


$.getJSON('userinfo.json', function(result) {
	if(result.data != null) 
	{
		mno = result.data.no;

		if(mno != 1) 
		{
			$("#update-btn").css("display", "none");
			$("#delete-btn").css("display", "none");
		}
		else
		{
			$("#update-btn").css("display", "block");
			$("#delete-btn").css("display", "block");
		}
	}
	else
	{
		alert("로그인 후 이용이 가능합니다");
		location.href = 'login.html';
	}
});



$.getJSON('detail.json', {'no': no}, function(result){
	
	var data = result.data;
	console.log(data)
	title.text(data.bw_titl);
	con.text(data.bw_con);
	title.attr('data-no', data.no);

	// 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.

	var templateFn = Handlebars.compile($('#detail-template').text());
	var generatedHTML = templateFn(result.data);
	console.log(result.data);
	var container = $('#fileList');
	container.text('');
	console.log(container);
	container.html(generatedHTML);

});




$('#confirm-btn').click(function(){
	location.href = 'share_board.html'
});

$('#delete-btn').click(function(){
	alert("삭제하시겠습니까?");
	$.getJSON('delete.json', {'no': no}, function(result) {
		alert("삭제되었습니다");
		location.href = 'share_board.html';
	})	
});

$("#cln-btn").click(function(){
	location.href = 'share_board.html';
});

$('#update-btn').click(function() {
	location.href = 'share_board_update.html?no=' + no;
});
