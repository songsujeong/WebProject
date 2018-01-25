package project.control.json;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;
import project.control.json.JsonResult;
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

			File file = new File(servletContext.getRealPath("/upload/" + files[i].getOriginalFilename()));
			System.out.println(servletContext.getRealPath("/upload/" + files[i].getOriginalFilename()));
			files[i].transferTo(file);

			System.out.println(files[i]);
			File thumbnail = new File(servletContext.getRealPath("/upload/" +  files[i].getOriginalFilename() + "_190"));
			Thumbnails.of(file).size(190, 150).outputFormat("png").toFile(thumbnail);
			thumbnail = new File(servletContext.getRealPath("/upload/" +  files[i].getOriginalFilename() + "_414"));
			Thumbnails.of(file).size(414, 350).outputFormat("png").toFile(thumbnail);

			fileList.add( files[i].getOriginalFilename());
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

	@RequestMapping("boardUpdate")
	public JsonResult conUpdate(Board board) throws Exception {
		boardService.boardUpdate(board);
		return new JsonResult(JsonResult.SUCCESS, "ok");
	}


}





