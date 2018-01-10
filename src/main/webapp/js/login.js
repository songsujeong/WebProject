


$('#login-btn').on('click',function(e) {
	$.post('login2.json', {
		'email': $('#login-email').val(),
		'password': $('#login-password').val()
	}, function(result) {
		if(result.status=="success")
		{
			// console.log();
			location.href = 'main.html'
				$('.login-link').css('display', 'none');
			$('.logout-link').css('display', 'block');

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
		'password': $('#login-password').val()
	}, function(result) {
		if(result.status=="success")
		{
			// console.log();
			location.href = 'main.html'
				$('.login-link').css('display', 'none');
			$('.logout-link').css('display', 'block');

			// e.preventDefault();
		} else {
			console.log(result.data)
		}
	}, 'json')
	// e.preventDefault();
}
var posi;
$.getJSON('userinfo.json', function (result) {
	try {
		if(result.data.no != null){
			$('.login-link').css('display', 'none');
			$('.logout-link').css('display', 'block');
			$('.sign-link').css('display', 'none');
			posi = result.data.posi;
		} 
	} catch(exception) {
		
	}
})
$('.logout-link').on('click', function() {
	$.getJSON('logout.json', function (result) {
		if (result.status != 'fail') {
			console.log(result)
			console.log(posi)
			$('.login-link').css('display', 'block');
			$('.logout-link').css('display', 'none');
			$('.sign-link').css('display', 'block');
			if(posi == 'kakao')
				logoutWithKakao()
			else if(posi == 'facebook'){
				fbLogout()
			}

		}

	})
})


