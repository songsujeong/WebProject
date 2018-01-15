package project.control.json;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import project.control.json.JsonResult;
import project.domain.Board;
import project.service.BoardService;

@RestController
@RequestMapping("/html/")
public class BoardControl {
  
  @Autowired ServletContext servletContext;
  @Autowired BoardService boardService;
  
  
/*  @RequestMapping("boardAdd")
  public JsonResult boardAdd(Board board) throws Exception {
    boardService.boardAdd(board);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }*/
  
  @RequestMapping("list")
  public JsonResult list(
      @RequestParam(defaultValue="1") int pageNo, 
      @RequestParam(defaultValue="5") int pageSize) throws Exception {
    
    System.out.println("들어왔따");
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", boardService.list(pageNo, pageSize));
    dataMap.put("totalCount", boardService.getSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping(path="boardAdd")
  public JsonResult fileupload(Board board, MultipartFile[] files) throws Exception {
  	  System.out.println(files.length);
      files[0].transferTo(new File(servletContext.getRealPath("/upload/" + files[0].getOriginalFilename())));
      
      board.setBw_filepath("/upload/" + files[0].getOriginalFilename());
     
      boardService.boardAdd(board);
      
    System.out.println(board);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  
  
  
  
  
//  /*************************************************/
  @RequestMapping("suchList")
  public JsonResult suchList(
      @RequestParam Map<String, String> keyword) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("suchList", boardService.suchList(keyword));
    dataMap.put("totalCount", boardService.suchGetSize(keyword));
    
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
//  /*************************************************/
  
//  
//  @RequestMapping("detail")
//  public JsonResult detail(int no) throws Exception {
//    Board board = boardService.get(no);
//    if (board == null) {
//      return new JsonResult(JsonResult.FAIL, no + "번 게시글이 없습니다.");
//    }
//    return new JsonResult(JsonResult.SUCCESS, board);
//  }
  @RequestMapping("delete")
  public JsonResult delete(int no) throws Exception {
    boardService.remove(no);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  } 
  
  
  @RequestMapping("conUpdate")
  public JsonResult conUpdate(Board board) throws Exception {
    boardService.conUpdate(board);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("hitsUpdate")
  public JsonResult conUpdate(int bwno) throws Exception {
    boardService.hitsUpdate(bwno);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }


}






