package com.sample.basic.sample.file.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

import com.sample.basic.sample.file.model.AttcFilB;
import com.sample.basic.sample.file.model.DeleteAttcFile;
import com.sample.basic.sample.file.model.RegisterExcel;
import com.sample.basic.sample.file.model.SaveAttcFileResult;

public interface FileService {

	// 파일 목록 조회
	public List<AttcFilB> listSearch(String encAttcFilNo);
	
	// 파일 다운로드
	public void download(String encAttcFilNo, String encAttcFilSeq, HttpServletRequest request, HttpServletResponse response) throws Exception;
	
	// 경로 다운로드
	public void pathDownload(String encFilePathAdr, String deleteYn, HttpServletRequest request, HttpServletResponse response) throws Exception;
	
	// 파일 저장
	public SaveAttcFileResult saveAttcFile(List<MultipartFile> multipartFileList, String encAttcFilNo, String prcScnCd) throws Exception;
	
	// 파일 목록 저장
	public List<AttcFilB> saveFileList(List<MultipartFile> multipartFileList, String encAttcFilNo, int attcFilSeq, String prcScnCd, String itgEeno) throws Exception;
	
	// 파일 삭제
	public void deleteAttcFile(DeleteAttcFile deleteAttcFile) throws Exception;
	
	// 첨부파일 상세조회
	public AttcFilB searchAttcFilB(AttcFilB attcFilB);
	
	// 엑셀 등록
	public String registerExcel(RegisterExcel registerExcel, HttpServletResponse response) throws Exception;
	
	// 파일 복사
	public String copy(String attcFilNo, String prcScnCd) throws Exception;
}
