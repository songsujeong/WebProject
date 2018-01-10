package project.service;

import java.util.List;
import java.util.Map;

import project.domain.Board;

public interface BoardService {
  void conAdd(Board board) throws Exception;
  List<Board> list(int pageNo, int pageSize) throws Exception;
  List<Board> suchList(Map<String, String> keyword) throws Exception;
  int getSize() throws Exception;
  int suchGetSize(Map<String, String> keyword) throws Exception;
  Board get(int no) throws Exception;
  void remove(int no) throws Exception;
  void conUpdate(Board board) throws Exception;
}







