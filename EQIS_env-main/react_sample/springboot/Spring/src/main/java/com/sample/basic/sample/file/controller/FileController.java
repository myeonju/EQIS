package com.sample.basic.sample.file.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sample.basic.cmm.model.Response;
import com.sample.basic.cmm.util.Path;
import com.sample.basic.cmm.util.ResponseHandler;
import com.sample.basic.sample.file.model.AttcFilB;
import com.sample.basic.sample.file.model.DeleteAttcFile;
import com.sample.basic.sample.file.model.RegisterExcel;
import com.sample.basic.sample.file.model.SaveAttcFileResult;
import com.sample.basic.sample.file.service.FileService;

/**
 * <pre>
 * 언어공통코드 상세
 * </pre>
 * 
 * @author user
 *
 */

@RestController
@RequestMapping(Path.FILE)
public class FileController {

	@Autowired
	private FileService fileService;
	
	@Autowired
	private ResponseHandler responseHandler;
	
	@GetMapping(Path.LIST_SEARCH)
	public ResponseEntity<Response> listSearchAttcFile(String encAttcFilNo) throws Exception {
		// 데이터 조회
		List<AttcFilB> resAttcFilBList = fileService.listSearch(encAttcFilNo);
		
		// 결과 반환
		return responseHandler.response(resAttcFilBList, null, HttpStatus.OK);
	}
	
	@GetMapping(Path.DOWNLOAD)
	public ResponseEntity<Response> download(String encAttcFilNo, String encAttcFilSeq, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 다운로드
		fileService.download(encAttcFilNo, encAttcFilSeq, request, response);
		
		// 결과 반환
		return null;
	}
	
	@GetMapping(Path.PATH_DOWNLOAD)
	public ResponseEntity<Response> excelDownload(String encFilePathAdr, String deleteYn, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 다운로드
		fileService.pathDownload(encFilePathAdr, deleteYn, request, response);
		
		// 결과 반환
		return null;
	}
	
	@PostMapping(Path.SAVE_ATTCFILE)
	public ResponseEntity<Response> saveAttcFile(List<MultipartFile> multipartFileList, String encAttcFilNo, String prcScnCd) throws Exception {
		// 데이터 적재
		SaveAttcFileResult saveAttcFileResult = fileService.saveAttcFile(multipartFileList, encAttcFilNo, prcScnCd);
		
		// 결과 반환
		return responseHandler.response(saveAttcFileResult, null, HttpStatus.OK);
	}
	
	@PostMapping(Path.SAVE_RDCOMMENTATTCFILE)
	public ResponseEntity<Response> saveRdcommentAttcFile(List<MultipartFile> multipartFileList, String encAttcFilNo, String prcScnCd) throws Exception {
		// 데이터 적재
		SaveAttcFileResult saveAttcFileResult = fileService.saveAttcFile(multipartFileList, encAttcFilNo, prcScnCd);
		
		// 결과 반환
		return responseHandler.response(saveAttcFileResult, null, HttpStatus.OK);
	}
	
	@PostMapping(Path.DELETE_ATTCFILE)
	public ResponseEntity<Response> deleteAttcFile(@RequestBody DeleteAttcFile deleteAttcFile) throws Exception {
		// 데이터 수정
		fileService.deleteAttcFile(deleteAttcFile);
		
		// 결과 반환
		return responseHandler.response(null, null, HttpStatus.OK);
	}
	
	@PostMapping(Path.DELETE_RDCOMMENTATTCFILE)
	public ResponseEntity<Response> deleteRdcommentAttcFile(@RequestBody DeleteAttcFile deleteAttcFile) throws Exception {
		// 데이터 수정
		fileService.deleteAttcFile(deleteAttcFile);
		
		// 결과 반환
		return responseHandler.response(null, null, HttpStatus.OK);
	}
	
	@PostMapping(Path.REGISTER_EXCEL)
	public ResponseEntity<Response> registerExcel(@RequestBody RegisterExcel registerExcel, HttpServletResponse response) throws Exception {
		// 다운로드
		String encFilePathAdr = fileService.registerExcel(registerExcel, response);
		
		// 결과 반환
		return responseHandler.response(encFilePathAdr, null, HttpStatus.OK);
	}
}
















































