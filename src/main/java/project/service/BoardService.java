package project.service;

import java.util.List;
import java.util.Map;

import project.domain.Board;

public interface BoardService {
  void boardAdd(Board board, int titleNo) throws Exception;
  List<Board> list(int pageNo, int pageSize) throws Exception;
  int getSize() throws Exception;
  int suchGetSize(Map<String, String> keyword) throws Exception;
  Board get(int no) throws Exception;
  void remove(int no) throws Exception;
  void boardUpdate(Board board) throws Exception;
  void titleImageInit(int no);
  void delAddImage(String delI);
  void updateTitlePic(String titleName);
  void updateBoard(Board board, int titleNo);
}