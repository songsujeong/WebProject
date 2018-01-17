$(document).ready(function(){
	$("#header").load("header.html")
	$('#logout').css('display', 'none');
})

var fiEmail = $('#login-email'),
    fiPassword = $('#login-pwd');




$('#login-btn').on('click',function(e) {
	if(fiEmail.val() == "") {
		alert("아이디(이메일)을 입력하세요");
	} 
	else if(fiPassword.val() == "") {
		alert("비밀번호를 입력하세요");
	}
	else {
	$.post('membLogin.json', {
		'email': $('#login-email').val(),
		'password': $('#login-pwd').val()
		
	}, function(result) {
		if(result.status=="success")
		{
			console.log("로그인성공..");
			location.href = 'share_board.html'
//				$('.login-link').css('display', 'none');
			$('#logout').css('display', 'block');

			// e.preventDefault();
		} else {
			console.log(result.data)
		}
	}, 'json')
	}
	// e.preventDefault();
})

$('#join-btn').on('click', function(e) {
	location.href = 'join.html'
})

function enter(){
	$.post('login2.json', {
		'email': $('#login-email').val(),
		'password': $('#login_pwd').val()
	}, function(result) {
		if(result.status=="success")
		{
			location.href = 'share_board.html'
//				$('.login-link').css('display', 'none');
//			$('.logout-link').css('display', 'block');

			// e.preventDefault();
		} else {
			console.log(result.data)
		}
	}, 'json')
	// e.preventDefault();
}	
