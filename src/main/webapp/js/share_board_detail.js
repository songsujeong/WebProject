$(document).ready(function(){
	$("#header").load("header.html")
})

var title=$('#titl'),
creater=$('#name'),
con=$('#con'),
wdt=$('#bw_wdt'),
fileList = $('#fileList'),
mno,
boardmno;

var no = 0;




$('#confirm').click(function(){
	location.href = 'share_board.html'
})

/*function displayList(pageNo, pageSize) {
	// 서버에서 강사 목록 데이터를 받아 온다.
  $.getJSON('list.json', {'pageNo':pageNo, 'pageSize': pageSize}, function(result) {
	var totalCount = result.data.totalCount;
	var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)
    // 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
    var templateFn = Handlebars.compile($('#file-template').text())
    var generatedHTML = templateFn(result.data)
		console.log(">>>>>>>>>>>"+result.data)
		var fileList = $('#fileList') 
		fileList.text('')
		fileList.html(generatedHTML)  // 문자열 html을 리턴한다.
    
    
    currPageNo = pageNo
    pageNoTag.text(currPageNo)

  }) // getJSON()
} // displayList()
*/

try {
	no = location.href.split('?')[1].split('=')[1]
} catch (err) {}

$.getJSON('detail.json', {'no': no}, function(result) {
	var data = result.data
	title.text(data.bw_titl)
	con.text(data.bw_con)

	console.log("이거", data)
	
    // 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
	
	var templateFn = Handlebars.compile($('#detail-template').text())
     var generatedHTML = templateFn(result.data.list)
     console.log(result.data.list)
     var container = $('#fileList') 
       container.text('')
       container.html(generatedHTML)
	


})

