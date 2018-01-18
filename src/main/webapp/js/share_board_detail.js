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
try {
	no = location.href.split('?')[1].split('=')[1]
} catch (err) {}

$.getJSON('detail.json', {'no': no}, function(result) {
	var data = result.data
	title.text(data.bw_titl)
	con.text(data.bw_con)
	title.attr('data-no', data.no)

	var newFileList = [] // 새롭게 파일을 네이밍 해줄 배열을 만든다.
	for(var i = 0; i < data.fileList.length; i++) {
	  // fileName 이라는 이름을 붙여서 파일 이름을 저장한다.
	  // ex) fileList
	  //        |->{fileName : 공.PNG}
	  newFileList[i] = {fileName: data.fileList[i]}
	}
	
	// 기존의 data아래의 fileList 에 새로 만든 배열값을 넣어준다.
	data.fileList = newFileList
	
	// 네이밍된 데이터 값을 확인할 수 있다.
	console.log(data.fileList)
	
    // 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
	
	var templateFn = Handlebars.compile($('#detail-template').text())
     var generatedHTML = templateFn(result.data)
     console.log(result.data)
     var container = $('#fileList') 
       container.text('')
       console.log(container)
       container.html(generatedHTML)

})




$('#confirm-btn').click(function(){
	location.href = 'share_board.html'
})

$('#delete-btn').click(function(){
	alert("삭제하시겠습니까?")
 $.getJSON('delete.json', {'no': no}, function(result) {
	 	alert("삭제되었습니다")
		  location.href = 'share_board.html'
	  })	
})

$("#cln-btn").click(function(){
	location.href = 'share_board.html'
})

$('#update-btn').click(function() {
		location.href = 'share_board_write.html?no=' + no
  })





$.getJSON('userinfo.json', function(result) {

	if(result.data != null) {
		mno = result.data.no;
		console.log(result.data.no)
		
		if(mno != 1) {
			$("#update-btn").css("display", "none")
			$("#delete-btn").css("display", "none")
			$("#cln-btn").css("display", "none")
		} else {
			$("#confirm-btn").css("display", "none")
		}
	}		
})