$(document).ready(function(){
	$("#header").load("header.html");
	$('#logout').css('display', 'none');


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
						$('#logout').css('display', 'block');
				} else {
					console.log(result.data)
					alert("로그인에 실패하였습니다");
				}
			}, 'json')
		}
	});
	
	$('#join-btn').on('click', function(e) {
		location.href = 'join.html'
	});

})


