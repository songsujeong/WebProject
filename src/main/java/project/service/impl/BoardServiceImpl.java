package project.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.dao.BoardDao;
import project.domain.Board;
import project.service.BoardService;


@Service
public class BoardServiceImpl implements BoardService {
  @Autowired
  BoardDao boardDao;



  public void boardAdd(Board board, int titleNo) throws Exception {
    boardDao.contextInsert(board);
    for (int i = 0; i < board.getFileList().size(); i++) {
      HashMap<String, Object> valueMap = new HashMap<>();
      valueMap.put("no", board.getNo());
      valueMap.put("img", board.getFileList().get(i));
      if(i == titleNo)
        valueMap.put("title", 1);
      else
        valueMap.put("title", 0);
      boardDao.insertImg(valueMap);
    }
  }

  public List<Board> list(int pageNo, int pageSize) throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("startIndex", (pageNo - 1) * pageSize);
    valueMap.put("pageSize", pageSize);

    return boardDao.selectList(valueMap);
  }


  @Override
  public int getSize() throws Exception {
    return boardDao.countAll();
  }


  @Override
  public int suchGetSize(Map<String, String> keyword) throws Exception {
    return boardDao.suchCountAll(keyword);
  }

  public Board get(int no) throws Exception {
    return boardDao.selectOne(no);
  }
  
  public void remove(int no) throws Exception {
    int count = boardDao.delete(no);
    if (count < 1) {
      throw new Exception(no + "번 테이블을 찾을 수 없습니다.");
    }

    try {
      count = boardDao.delete(no);
    } catch (Exception e) {}
  }

  
  public void boardUpdate(Board board) throws Exception {
    int count = boardDao.boardUpdate(board);
    if (count < 1) {
      throw new Exception(board.getNo() + "번 강사를 찾을 수 없습니다.");
    }
  }

  @Override
  public void titleImageInit(int no) {
    // TODO Auto-generated method stub
    boardDao.titleImageInit(no);
  }

  @Override
  public void delAddImage(String delI) {
    // TODO Auto-generated method stub
    System.out.println("imple 에서:" + delI);
    boardDao.delAddImage(delI);
  }

  @Override
  public void updateTitlePic(String titleName) {
    // TODO Auto-generated method stub
    boardDao.updateTitlePic(titleName);
  }

  @Override
  public void updateBoard(Board board, int titleNo) {
    // TODO Auto-generated method stub
    System.out.println("implement updatePromotion");
    boardDao.updateBoard(board);
    
    if(board.getFileList() !=null) {
      for (int i = 0; i < board.getFileList().size(); i++) {
        HashMap<String, Object> valueMap = new HashMap<>();
        valueMap.put("no", board.getNo());
        valueMap.put("img", board.getFileList().get(i));
        if(i == titleNo)
          valueMap.put("title", 1);
        else
          valueMap.put("title", 0);
        System.out.println(valueMap);
        boardDao.insertImg(valueMap);
      }
    }
  }

}

