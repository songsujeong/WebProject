var Titl = $('#bw_titl'),
    Con = $('#bw_con'),
    Div = "board",
    mno

$(document).ready(function(){
	$("#header").load("header.html")
})

$('#cln').on('click', function(e){
	location.href = 'share_board.html'
})

$('#add').on('click', function(e){
	$.post('boardAdd.json', {
	      'mno' : mno,
	      'bw_titl': Titl.val(),
	      'bw_con': Con.val(),
	      'bw_div': Div
	    }, function(result) {
	      location.href = 'share_board.html'
	    }, 'json')
})


$('#conaddbtn').on('click',function() {
	console.log('fgaf');
    $.post('conAdd.json', {
      'mno' : mno,
      'bw_titl': Titl.val(),
      'bw_con': Con.val(),
      'bw_div': Div
    }, function(result) {
      location.href = 'board.html'
    }, 'json')
  })
  
$.getJSON('userinfo.json', function(result) {
    mno = result.data.no;
})