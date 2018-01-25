package project.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.domain.Member;
import project.service.MemberService;

@RestController
@RequestMapping("/html/")
public class MemberControl {
  
  @Autowired ServletContext servletContext;
  @Autowired MemberService memberService;
  
  //회원가입
  @RequestMapping("membAdd")
  public JsonResult membAdd(Member member) {
	  JsonResult result = new JsonResult();
	  
	  try {
		  memberService.membAdd(member);
	  } catch (Exception e) {
		  result.setStatus(JsonResult.ERROR);
		  result.setData(e.getMessage());
		  System.out.println(e.getMessage());
	  }
	  
	  	result.setStatus(JsonResult.SUCCESS);
	  	result.setData("ok");
	  	
	  	return result;
  }
}