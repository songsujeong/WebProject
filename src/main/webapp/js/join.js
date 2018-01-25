$(document).ready(function(){
	$("#header").load("header.html");
})

var fiName = $('#join-name'),
fiEmail = $('#join-email'),
fiPassword = $('#join-pwd'),
fiPasswordConf = $('#join-pwdConf');



$('#join-btn').on('click',function(e) {

	if(fiName.val() == ''){
		alert("이름을 입력하세요");
	}
	else if (fiEmail.val() == '') {
		alert("이메일을 입력하세요");
	}
	else if (fiPassword.val() == '') {
		alert("비밀번호를 입력하세요");
	}
	else if (fiPasswordConf.val() == '') {
		alert("비밀번호를 확인하세요");
	}
	else if(fiPassword.val() != fiPasswordConf.val()){
		alert("비밀번호가 다릅니다");
	}
	else if (fiPassword.val() == fiPasswordConf.val()) {
		console.log('가입완료');	
		$.post('membAdd.json', {
			'name' : fiName.val(),
			'email': fiEmail.val(),
			'password': fiPassword.val(),
			'posi':'user'
		}, function(result) {
			if(result.status=="success")
			{
				console.log(result);
				alert("가입이 완료되었습니다!");
				location.href = 'login.html'
				// e.preventDefault();
			} else 
			{
				console.log(result.data);
			}
		}, 'json')
		// e.preventDefault();
	}
})

$('#rtn-btn').on('click',function() {
	location.href = 'login.html';
})

