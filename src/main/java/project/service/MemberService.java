package project.service;

import project.domain.Member;

public interface MemberService {
  void membAdd(Member member) throws Exception;
  Member getByEmailPassword(String email, String password) throws Exception;
}
