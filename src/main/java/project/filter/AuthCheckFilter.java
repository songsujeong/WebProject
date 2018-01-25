package project.filter;

/* 역할: HttpSession 객체에 로그인 회원 정보가 있는 검사한다. */

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import project.domain.Member;


@WebFilter({"/html/share_board_detail.html", "/html/share_board_write.html", "/html/share_board_update.html"})
public class AuthCheckFilter implements Filter {

	public void destroy() {}

	   public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) 
	       throws IOException, ServletException {
	     HttpServletRequest httpRequest = (HttpServletRequest) request;
	     HttpServletResponse httpResponse = (HttpServletResponse) response;

	     Member loginMember = (Member)httpRequest.getSession().getAttribute("loginMember");
	     if (loginMember == null) { // 쿠키에 세션 아이디가 없다면
	       httpResponse.sendRedirect("../html/login.html"); // 로그인 화면으로 보낸다.
	      return;
	     }
	    // 그 밖(쿠키에 세션아이디가 있다면, 로그인 했다면) 다음 필터 또는 서블릿을 실행해야 한다.
	      chain.doFilter(request, response);
	   }

	   public void init(FilterConfig fConfig) throws ServletException {}

	}
