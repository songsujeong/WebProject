

$(document).ready(function(){
	$("#header").load("header.html")
})

$('#clickTest').click(function(){
	$.post('hitsUpdate.json', {
	      'bw_no' : no,
	      'bw_hits' : bw_hits
	    }, function(result) {
	      location.href = 'share_board.html'
	    }, 'json')
})