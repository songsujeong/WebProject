package project.control.json;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;
import project.domain.Board;
import project.service.BoardService;

@RestController
@RequestMapping("/html/")
public class BoardControl {

	@Autowired 
	private ServletContext servletContext;
	@Autowired 
	private BoardService boardService;


	@RequestMapping("list")
	public JsonResult list(
			@RequestParam(defaultValue="1") int pageNo, 
			@RequestParam(defaultValue="5") int pageSize) throws Exception {

		HashMap<String,Object> dataMap = new HashMap<>();
		dataMap.put("list", boardService.list(pageNo, pageSize));
		dataMap.put("totalCount", boardService.getSize());

		return new JsonResult(JsonResult.SUCCESS, dataMap);
	}


	@RequestMapping(path="boardAdd")
	public JsonResult fileupload(Board board, MultipartFile[] files) throws Exception {
		System.out.println(board);
		String titleName = board.getTitlePic();
		int titleNo=0;


		ArrayList<String> fileList = new ArrayList<>();

		for (int i = 0; i < files.length; i++) {
			if (files[i].isEmpty()) 
				continue;
			
			String newFilename = this.getNewFilename();
			File file = new File(servletContext.getRealPath("/upload/" + newFilename));
			System.out.println(servletContext.getRealPath("/upload/" + newFilename));
			files[i].transferTo(file);

			System.out.println(files[i]);
			File thumbnail = new File(servletContext.getRealPath("/upload/" + newFilename + "_190"));
			Thumbnails.of(file).size(190, 150).outputFormat("png").toFile(thumbnail);
			thumbnail = new File(servletContext.getRealPath("/upload/" + newFilename + "_414"));
			Thumbnails.of(file).size(414, 350).outputFormat("png").toFile(thumbnail);

			fileList.add(newFilename);
		}
		if (titleName != null) {
			for (int i = 0; i < files.length; i++) {
				if (files[i].getOriginalFilename().equals(titleName))
					titleNo = i;
			}
		}
		board.setFileList(fileList);
		boardService.boardAdd(board, titleNo);

		return new JsonResult(JsonResult.SUCCESS, "ok");
	}


	@RequestMapping("detail")
	public JsonResult detail(int no) throws Exception {
		Board board = boardService.get(no);
		if (board == null) {
			return new JsonResult(JsonResult.FAIL, no + "번 게시글이 없습니다.");
		}
		return new JsonResult(JsonResult.SUCCESS, board);
	}

	@RequestMapping("delete")
	public JsonResult delete(int no) throws Exception {
		boardService.remove(no);
		return new JsonResult(JsonResult.SUCCESS, "ok");
	}

//	@RequestMapping("boardUpdate")
//	public JsonResult conUpdate(Board board) throws Exception {
//		boardService.boardUpdate(board);
//		return new JsonResult(JsonResult.SUCCESS, "ok");
//	}

	@RequestMapping("boardUpdate")
  public JsonResult updateBoard(Board board, MultipartFile[] files, String[] delImage, int indexPic) throws Exception {
    System.out.println("update control!!");
    System.out.println("board" + board);
    System.out.println("delImage:" + delImage);
    
    // 1 =  업로드 안했지만 전타이틀 사진과 같을 때  
    // 2 = 업로드 안했지만 타이틀이 바뀜 
    // 3 = 새로 업로드된 사진이 타이틀 사진일때
    // 4 = 새로 업로드 됬지만 전타이틀 사진과 같을때 
    // 5 = 새로 업로드 됬지만 전타이틀 사진과 다르고, 전에 올린사진 중에 하나가 타이틀 일때.
    System.out.println("indexPic:"+ indexPic); 
 // 대표 이미지 초기화
    // 2 3 5 일떄 초기화
    if (indexPic == 2 || indexPic == 3 || indexPic ==5) 
      boardService.titleImageInit(board.getNo());
    String titleName = board.getTitlePic();
    int titleNo=0;

    System.out.println(titleName);
    ArrayList<String> fileList = new ArrayList<>();
    
        
    
  
    if(delImage != null) {
      System.out.println("컨트롤~이미지 삭제!!!");
      for (String delI : delImage){
        boardService.delAddImage(delI);
      }
    }
    
    if (files != null) {
      for (int i = 0; i < files.length; i++) {
        if (files[i].isEmpty()) 
          continue;
        
        String newFilename = this.getNewFilename();
        File file = new File(servletContext.getRealPath("/upload/" + newFilename));
        System.out.println(servletContext.getRealPath("/upload/" + newFilename));
        files[i].transferTo(file);

        System.out.println(files[i]);
        File thumbnail = new File(servletContext.getRealPath("/upload/" + newFilename + "_190"));
        Thumbnails.of(file).size(190, 150).outputFormat("png").toFile(thumbnail);
        thumbnail = new File(servletContext.getRealPath("/upload/" + newFilename + "_414"));
        Thumbnails.of(file).size(414, 350).outputFormat("png").toFile(thumbnail);

        fileList.add(newFilename);
      }
     
      if (titleName != null) {
        for (int i = 0; i < files.length; i++) {
          if (files[i].getOriginalFilename().equals(titleName))
            titleNo = i;
        }
      }
    
     System.out.println("fileList:" + fileList);
     board.setFileList(fileList);
     System.out.println("board.getFileList()" + board.getFileList());
    }
    
    if (indexPic == 2 || indexPic == 3 || indexPic ==5) 
      boardService.updateTitlePic(titleName);
    boardService.updateBoard(board, titleNo);
     return new JsonResult(JsonResult.SUCCESS, "ok");
  }
	
	int count = 0;
  synchronized private String getNewFilename() {
    if (count > 100) {
      count = 0;
    }
    return String.format("%d_%d", System.currentTimeMillis(), ++count); 
  }
}





