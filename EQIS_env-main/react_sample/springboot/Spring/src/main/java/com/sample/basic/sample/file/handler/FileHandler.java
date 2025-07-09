package com.sample.basic.sample.file.handler;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.exception.model.ExceptionCode;
import com.sample.basic.cmm.security.util.MD5;
import com.sample.basic.cmm.util.Dateformat;
import com.sample.basic.cmm.util.Drm;
import com.sample.basic.sample.file.model.RegisterExcel;
import com.sample.basic.sample.notice.model.NoticeListGrid;


/**
 * <pre>
 * Statement 
 * </pre>
 *  
 * @author user
 *
 */

@Component
public class FileHandler {

	@Value("${spring.servlet.multipart.location}")
	private String location;
	
	@Autowired
	private MD5 md5;
	
	@Autowired
	private Drm drm;
	
	@PostConstruct
	public void init() {
		try {
			Files.createDirectories(Paths.get(location));
		}	catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	// 파일저장 기본경로 가져오기
	public String getAbsolutePath() {
		return Paths.get(location).toAbsolutePath().toString() + File.separator;
	}
	
	// 파일저장 세부경로 가져오기
	public String getDetailPath(String prcScnCd) {
		return prcScnCd.toUpperCase() + File.separator + Dateformat.toContinuousyyyyMMdd();
	}
	
	// 폴더 존재여부 확인
	public void checkDirectory(File file) {
		// 폴더가 존재하지 않을 경우 폴더 생성
		if(!file.exists()) {
			boolean suceess = file.mkdirs();
			
			// 폴더 생성에 실패했을 경우
			if(!suceess) {
				throw new CustomException(ExceptionCode.BAD_PROCESS);
			}
		}
	}
	
	// 신규 파일이름 가져오기
	public String getNewFileName(String fileName, String originalFileExtension) {
		return md5.encrypt(Dateformat.toyyyyMMddHHmmss() + fileName) + "." + originalFileExtension; 
	}
	
	// 파일권한 생성
	public void setFileRole(File file) {
		file.setWritable(true);
		file.setReadable(true);
	}
	
	//파일명으로 파일을 찾아 resource를 반환
	public Resource loadFile(String fileName) throws FileNotFoundException {
		try {
			Path file = Paths.get(location).resolve(fileName).normalize();
			Resource resource = new UrlResource(file.toUri());
			
			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new FileNotFoundException("Could not find file");
			}
		} catch (MalformedURLException e) {
			throw new FileNotFoundException("Could not download file");
		}
	}
	
	// 파일 다운로드
	public void download(HttpServletRequest request, HttpServletResponse response, File file, String filename) throws Exception {
		// DRM 암호화
		String encryptPath = drm.encrypt(file.getAbsolutePath());
		File encryptfile = new File(encryptPath);
		
		// 데이터 적제
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(encryptfile.getAbsolutePath());
		} catch(Exception e) {
			throw new CustomException(ExceptionCode.BAD_PROCESS);
		}
		
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		response.setContentType(contentType);
		response.setHeader("Content-Dispotion", "attachment;filename=" + URLEncoder.encode(filename, "UTF-8"));
		response.setHeader("Content-Transfer-Encoding", "binary");
		response.setContentLength((int) encryptfile.length());
		
		// 다운로드
		OutputStream out = response.getOutputStream();
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(encryptfile);
			FileCopyUtils.copy(fis, out);
			out.flush();
		} catch (Exception e) {
			throw new CustomException(ExceptionCode.INVALID_RESOURCE);
		} finally {
			if (fis != null) {
				try {
					fis.close();
					
					// DRM 암호화된 파일 삭제
					encryptfile.delete();
				} catch (Exception e) {
					throw new CustomException(ExceptionCode.BAD_PROCESS);
				}
			}
		}
	}
	
	// 엑셀파일 등록
	public String registerExcel(RegisterExcel registerExcel, HttpServletResponse response) throws Exception {
		List<String> headerNameList = registerExcel.getHeaderNameList();
		List<Map<String, Object>> mapList = registerExcel.getMapList();
		
		// sheet 생성
		Workbook workbook = new XSSFWorkbook();
		Sheet sheet = workbook.createSheet("Sheet1");
		
		// style 가져오기
		XSSFCellStyle headerXssfCellStyle = createHeaderStyle(workbook);
		XSSFCellStyle bodyXssfCellStyle = createHeaderStyle(workbook);
		
		// 데이터 등록
		Row row = null;
		Cell cell = null;
		int rowNum = 1;
		
		if(mapList.size() <= 0) {
			throw new CustomException(ExceptionCode.NONE_RESOURCE);
		}
		
		// header 설정
		row = sheet.createRow(rowNum++);
		
		for(int i=0; i<headerNameList.size(); i++) {
			cell = row.createCell(i);
			cell.setCellValue(headerNameList.get(i));
			cell.setCellStyle(headerXssfCellStyle);
		}
		
		// body 설정
		for(Map<String, Object> map:mapList) {
			List<String> bodyNameList = new ArrayList<>(map.keySet());
			row = sheet.createRow(rowNum++);
			
			for(int j=0; j<bodyNameList.size(); j++) {
				cell = row.createCell(j);
				cell.setCellValue(map.get(bodyNameList.get(j)) == null ? "" : map.get(bodyNameList.get(j)).toString());
				cell.setCellStyle(bodyXssfCellStyle);
			}
		}
		
		// 파일 생성
		String absolutePath = getAbsolutePath(); // 파일을 저장할 절대경로 가져오기 (기본 경로, ex> /wasapp/sqim/upload)
		String detailPath = getDetailPath("EXCEL"); // 파일을 저장할 세부겨올 가져오기(프로세스별 저장 경로. ex> /EXCEL/202207)
		String directoryPath = absolutePath + detailPath;
		checkDirectory(new File(directoryPath));
		
		String newFileName = getNewFileName("EXCEL", "xlsx");
		String filePathAdr = Paths.get(directoryPath, newFileName).toString();
		FileOutputStream out = new FileOutputStream(filePathAdr);
		
		workbook.write(out);
		workbook.close();
		out.close();
		
		// 결과 반환
		return filePathAdr;
	}
	
	public void downloadExcel(List<String> headerNameList, List<NoticeListGrid> mapList, HttpServletResponse response) throws Exception {
		// sheet 생성
		Workbook workbook = new XSSFWorkbook();
		Sheet sheet = workbook.createSheet("Sheet1");
		
		// style 가져오기
		XSSFCellStyle headerXssfCellStyle = createHeaderStyle(workbook);
		XSSFCellStyle bodyXssfCellStyle = createHeaderStyle(workbook);
		
		// 데이터 등록
		Row row = null;
		Cell cell = null;
		int rowNum = 1;
		
		if(mapList.size() <= 0) {
			throw new CustomException(ExceptionCode.NONE_RESOURCE);
		}
		
		// header 설정
		row = sheet.createRow(rowNum++);
		
		for(int i=0; i<headerNameList.size(); i++) {
			cell = row.createCell(i);
			cell.setCellValue(headerNameList.get(i));
			cell.setCellStyle(headerXssfCellStyle);
		}
		
		// body 설정
		for(NoticeListGrid notice :mapList) {
			row = sheet.createRow(rowNum++);
			int colNum = 0;
			
			for(String header: headerNameList) {
				cell = row.createCell(colNum++);
				
				switch(header) {
				case "No." :
					cell.setCellValue(notice.getPwiImtrNo());
					break;
				case "제목" :
					cell.setCellValue(notice.getTitlNm());
					break;
				case "내용" :
					cell.setCellValue(notice.getPwiImtrSbc());
					break;
				case "팝업시작일시" :
					cell.setCellValue(notice.getPopuStrDtm());
					break;
				case "팝업종료일시" :
					cell.setCellValue(notice.getPopuFnhDtm());
					break;
				default :
					cell.setCellValue("");
					break;
				}
				
			}
		}
		
		// 파일 전송
		String fileName = "exported_excel_" + System.currentTimeMillis() + ".xlsx";
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
		
		try (OutputStream out = response.getOutputStream()){
			workbook.write(out);
			out.flush();
		}catch(IOException e) {
			
		} finally {
			workbook.close();
		}
	}
	
	public XSSFCellStyle createHeaderStyle(Workbook workbook) {
		XSSFCellStyle xssfCellStyle = (XSSFCellStyle) workbook.createCellStyle();
		
		xssfCellStyle.setBorderRight(BorderStyle.THIN);
		xssfCellStyle.setBorderLeft(BorderStyle.THIN);
		xssfCellStyle.setBorderTop(BorderStyle.THIN);
		xssfCellStyle.setBorderBottom(BorderStyle.THIN);
		xssfCellStyle.setFillForegroundColor(new XSSFColor(new byte[] {(byte) 192,(byte) 192,(byte) 192}, null));
		xssfCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

		return xssfCellStyle;
	}
	
	public XSSFCellStyle createBodyStyle(Workbook workbook) {
		XSSFCellStyle xssfCellStyle = (XSSFCellStyle) workbook.createCellStyle();
		
		xssfCellStyle.setBorderRight(BorderStyle.THIN);
		xssfCellStyle.setBorderLeft(BorderStyle.THIN);
		xssfCellStyle.setBorderTop(BorderStyle.THIN);
		xssfCellStyle.setBorderBottom(BorderStyle.THIN);

		return xssfCellStyle;
	}
	
}

























