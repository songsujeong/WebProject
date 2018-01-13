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
  
  @RequestMapping("add2")
  public JsonResult add2(Member member) {
	  System.out.println("##############");
	  JsonResult result = new JsonResult();
	  
	  try {
		  System.out.println("try 들어왔거든?");
		  memberService.add2(member);
		  System.out.println(" memberService.add2  메소드 실행끝");
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









