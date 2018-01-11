// 로그인 사용자 정보를 가져온다.
/*$.getJSON(contextRoot + '/userinfo.json', function(result) {
  if (result.data) {
    $('#login').append($('<span>').html(result.data.name + '(' + result.data.email + ')'))
               .append($('<a>').attr('id','logout-link').attr('href', '#').text('로그아웃'))
  }
}) // getJSON()
*/
//$(document.body).on('click', '#logout-link', function(event) {
//  $.getJSON(contextRoot + '/logout.json', function(result) {
//    location.href = contextRoot + '/teacher/index.html'
//  })
//})