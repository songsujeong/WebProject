$(document).ready(function(){
	$("#header").load("header.html")
})

var pageNoTag = $('#page-no')  // 매번 이걸 찾으면 안좋다 찾아놓은걸 쓰자
tbody = $('table > tbody'),
prevBtn = $('#prev-btn'),
nextBtn = $('#next-btn'),
currPageNo = $('#page-no')
pageSize = 10;

var mno;


$('#add_btn').on('click', function(e){
	location.href = 'share_board_write.html'
})


displayList(1);

function displayList(pageNo){
	// 서버에서 강사 목록 데이터를 받아 온다.
	console.log("실행됬다")
//	setTimeout(() => {

	// console.log(pageNo, pageSize)
	$.getJSON('list.json', {'pageNo':pageNo, 'pageSize':pageSize}, function(result) {// url, 서버에 보낼 데이터, 서버에서 받을 함수 비동기 방식

		var totalCount = result.data.totalCount
		var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1: 0)

		var templateFn = Handlebars.compile($('#tbody-template').text())
		var generatedHTML = templateFn(result.data)
		console.log(result.data)
		var container = $('#share_container') 
		container.text('')
		container.html(generatedHTML)  // 문자열 html을 리턴한다.

		console.log(result)
		currPageNo = pageNo
		pageNoTag.text(currPageNo)
		if(currPageNo == 1){
			prevBtn.prop('disabled', true)
			prevBtn.addClass("disable")
		} else {
			prevBtn.prop('disabled', false)
			prevBtn.removeClass("disable")
		}

		if(currPageNo == lastPageNo){
			nextBtn.prop('disabled', true)
			nextBtn.addClass("disable")
		} else {
			nextBtn.prop('disabled', false)
			nextBtn.removeClass("disable")
		}

	})
}
/************************************************/

$(document.body).on('click', '#home_img', function(event){
	location.href = 'share_board_detail.html?no=' + $(this).parent().parent().attr('data-no')
	event.preventDefault()
})

/*****************************************************/
$('#bord-btn').click(function(){
	if (mno != null) {
		location.href = 'boardwrite.html'
	} else {
		swal({
			title: "로그인이 필요합니다",
			text: "서비스를 이용하시려면 로그인이 필요합니다.",
			confirmButtonText: "확인",
			confirmButtonColor: "#6384E1",
			html: true
		}, function(isConfirm){
			console.log("isConfirm!!!!!1",isConfirm)
			if(isConfirm == true){
				location.href = "board.html"
			}
		})

	}
})









/******************************************************/



prevBtn.click(function() {
	displayList(currPageNo - 1)
})

nextBtn.click(function() {
	displayList(currPageNo + 1)
})





$.getJSON('userinfo.json', function(result) {

	if(result.data != null) {
		mno = result.data.no;
	}		

})


//
//$.('#home_img').click(function() {
//	console.log(this)
////	no =
////	$.getJSON('detail.json', {'no': no}, function(result) {
////	    var data = result.data
////	    creater.text(data.name)
////	    title.text(data.bw_titl)
////	    con.text(data.bw_con)
////	    wdt.text(data.bw_wdt)
////	    filePath.attr("src", data.filePath)
////	    boardmno = data.mno
////	    console.log("이거", data)
////	    
////	})
//})