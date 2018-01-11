

$('#login_btn').on('click',function(e) {
	$.post('login2.json', {
		'email': $('#login_email').val(),
		'password': $('#login_pwd').val()
	}, function(result) {
		if(result.status=="success")
		{
			console.log("로그인성공...");
			// console.log();
			location.href = 'boader.html'
//				$('.login-link').css('display', 'none');
//			$('.logout-link').css('display', 'block');

			// e.preventDefault();
		} else {
			console.log(result.data)
		}
	}, 'json')
	 e.preventDefault();
})

function enter(){
	$.post('login2.json', {
		'email': $('#login-email').val(),
		'password': $('#login_pwd').val()
	}, function(result) {
		if(result.status=="success")
		{
			// console.log();
			location.href = 'boader.html'
//				$('.login-link').css('display', 'none');
//			$('.logout-link').css('display', 'block');

			// e.preventDefault();
		} else {
			console.log(result.data)
		}
	}, 'json')
	// e.preventDefault();
}	
