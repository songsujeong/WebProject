$(document).ready(function(){
	$("#header").load("header.html")
})

var tbody = $('.box-form'),
title=$('#bw_titl'),
creater=$('#name'),
con=$('#bw_con'),
wdt=$('#bw_wdt'),
bw_filepath = $('#bw_filepath'),
mno,
boardmno;

var no = 0;




$('#confirm').click(function(){
	location.href = 'share_board.html'
})


try {
	no = location.href.split('?')[1].split('=')[1]
} catch (err) {}

$.getJSON('detail.json', {'no': no}, function(result) {
	var data = result.data
	creater.text(data.name)
	title.text(data.bw_titl)
	con.text(data.bw_con)
	wdt.text(data.bw_wdt)
	filePath.attr("src", data.filePath)
	boardmno = data.mno
	console.log("이거", data)

})

