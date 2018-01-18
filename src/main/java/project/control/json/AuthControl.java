package project.control.json;


import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import project.domain.Member;
import project.service.MemberService;

@RestController
@RequestMapping("/html/")
@SessionAttributes({"loginMember"})
public class AuthControl {
  @Autowired
  MemberService memberService;

  @RequestMapping(path="membLogin", method=RequestMethod.POST)
  public JsonResult membLogin(String email, String password, String saveEmail, 
       HttpSession session) throws Exception {
    Member member = null;
    member = memberService.getByEmailPassword(email, password);
    System.out.println(member);
    
    if (member != null) { 
      session.setAttribute("loginMember", member);
      
      return new JsonResult(JsonResult.SUCCESS, "ok");
      
    } else {
    	System.out.println("실패...");
      return new JsonResult(JsonResult.FAIL, "fail");
    }
  }
  
  @RequestMapping("logout")
  public JsonResult logout(HttpSession session, SessionStatus status) throws Exception {
    status.setComplete();
    session.invalidate();  
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("userinfo")
  public JsonResult userinfo(HttpSession session) throws Exception {
    Member loginMember = (Member)session.getAttribute("loginMember");
    return new JsonResult(JsonResult.SUCCESS, loginMember);
  }
}

