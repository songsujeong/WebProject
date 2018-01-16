$(document).ready(function(){
	$("#header").load("header.html")
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
	// e.preventDefault();
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
