package project.dao;

import java.util.Map;

import project.domain.Member;

public interface MemberDao {
  int insert(Member member);
  Member selectOneByEmailPassword(Map<String,Object> valueMap);
}