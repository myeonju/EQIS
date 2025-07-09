package com.sample.basic.sample.file.service.impl;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.exception.model.ExceptionCode;
import com.sample.basic.cmm.security.util.Aes256;
import com.sample.basic.cmm.util.Constant;
import com.sample.basic.cmm.util.Dateformat;
import com.sample.basic.cmm.util.Drm;
import com.sample.basic.sample.file.entity.AttcFilBEntity;
import com.sample.basic.sample.file.handler.FileHandler;
import com.sample.basic.sample.file.mapper.AttcFileMapper;
import com.sample.basic.sample.file.model.AttcFilB;
import com.sample.basic.sample.file.model.DeleteAttcFile;
import com.sample.basic.sample.file.model.RegisterExcel;
import com.sample.basic.sample.file.model.SaveAttcFileResult;
import com.sample.basic.sample.file.repository.AttcFilBJpaRepository;
import com.sample.basic.sample.file.repository.AttcFilBQueryRepository;
import com.sample.basic.sample.file.service.FileService;

/**
 * <pre>
 * Statement 
 * </pre>
 *  
 * @author user
 *
 */

@Service
public class FileServiceImpl implements FileService {
	
	@Autowired
	private Aes256 aes256; 
	
	@Autowired
	private AttcFilBJpaRepository attcFilBJpaRepository;
	
	@Autowired
	private AttcFilBQueryRepository attcFilBQueryRepository;
	
	@Autowired
	private FileHandler fileHandler;
		
//	@Autowired
//	private JwtProvider jwtProvider;

	@Autowired
	private Drm drm;
	
	// 파일 목록 조회
	@Override
	public List<AttcFilB> listSearch(String encAttcFilNo) {
		String attcFilNo = aes256.paramDecrpyt(encAttcFilNo);
		
		// 데이터 조회
		List<AttcFilB> resAttcFilBList = attcFilBQueryRepository.findOfList(attcFilNo);
		
		// 결과 반환
		return resAttcFilBList;
	}	

	// 파일 다운로드
	@Override
	public void download(String encAttcFilNo, String encAttcFilSeq, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String attcFilNo = aes256.decrypt(encAttcFilNo);
		int attcFilSeq = Integer.valueOf(aes256.paramDecrpyt(encAttcFilSeq));
		
		// 데이터 조호ㅣ
		AttcFilB attcFilB = AttcFilB.builder()
									.attcFilNo(attcFilNo)
									.attcFilSeq(attcFilSeq)
									.build();
		
		AttcFilBEntity resAttcFilBEntity = attcFilBQueryRepository.findOneOfUse(attcFilB);
		if(resAttcFilBEntity == null) {
			throw new CustomException(ExceptionCode.INVALID_RESOURCE);
		}
		
		// 다운로드
		fileHandler.download(request, 
				             response, 
				             new File(resAttcFilBEntity.getAttcFilPathAdr()), 
				             resAttcFilBEntity.getAttcFilOgcNm());
	}
	
	// 경로 다운로드
	@Override
	public void pathDownload(String encFilePathAdr, String deleteYn, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String filePathAdr = aes256.decrypt(encFilePathAdr);
		
		File file =new File(filePathAdr);
		String extension = StringUtils.getFilenameExtension(file.getName());
		
		// 다운로드
				fileHandler.download(request, 
						             response, 
						             file, 
						             "download" + Dateformat.toContinuousyyyyMMddHHmmss() + "." + extension);
				
		// 경로에 있는 파일 삭제
		if("Y".equals(deleteYn)) {
			file.delete();
		}
	}
	
	// 파일 저장
	@Override
	public SaveAttcFileResult saveAttcFile(List<MultipartFile> multipartFileList, String encAttcFilNo, String prcScnCd) throws Exception {
		// token으로 정보 조회
		//EeB eeB = jwtProvider.getEeb();
		
		// 복호화
		String attcFilNo = aes256.paramDecrpyt(encAttcFilNo);
		
		// 파일번호 확인
		if(!StringUtils.hasText(attcFilNo)) {
			attcFilNo = attcFilBQueryRepository.findOfNextFileNo();
		}
		
		int attcFilSeq = attcFilBQueryRepository.findOfNextFileSeq(attcFilNo);
		
		// 파일 저장
		saveFileList(multipartFileList, encAttcFilNo, attcFilSeq, prcScnCd, "SYSTEM");
		
		// 결과 반환
		SaveAttcFileResult saveAttcFileResult = SaveAttcFileResult.builder()
																  .attcFilNo(attcFilNo)
																  .encAttcFilNo(aes256.encrypt(attcFilNo))
																  .build();
		
		return saveAttcFileResult;
	}
	
	// 파일 목록 저장
	public List<AttcFilB> saveFileList(List<MultipartFile> multipartFileList, String attcFilNo, int attcFilSeq, String prcScnCd, String itgEeno) throws Exception {
		// 첨부파일 리스트
		List<AttcFilBEntity> attcFilBEntityList = new ArrayList<>();
		
		// 전달되어 온 파일이 존재할 경우
		if(!CollectionUtils.isEmpty(multipartFileList)) {
			String absolutePath = fileHandler.getAbsolutePath();
			String detailPath = fileHandler.getDetailPath(prcScnCd);
			String directoryPath = absolutePath + detailPath;
			
			File file = new File(directoryPath); 
			fileHandler.checkDirectory(file); // 폴더 존재여부 확인 (없으면 생성)
			
			// 파일 생성
			for(MultipartFile multipartFile : multipartFileList) {
				synchronized(this) {
					String originalFileName = multipartFile.getOriginalFilename(); // 원본 파일 이름
					long fileSize = multipartFile.getSize(); // 원본 파일 사이즈
					String originalFileExtension = StringUtils.getFilenameExtension(originalFileName); // 신규 파일 이름
					String newFileName = fileHandler.getNewFileName(originalFileName, originalFileExtension); // 신규 파일 이름
					String filePathAdr = Paths.get(directoryPath, newFileName).toString(); // 파일 경로 주소
					
					// 확장자 검증
					for(String extBlack : Constant.EXT_BLACK_LIST) {
						if(extBlack.toUpperCase().equals(originalFileExtension.toUpperCase())) {
							throw new CustomException(ExceptionCode.INVALID_FILE_EXTENSION);
						}
					}
					
					boolean checkExtWhite = false;
					for(String extWhite : Constant.EXT_WHITE_LIST) {
						if(extWhite.toUpperCase().equals(originalFileExtension.toUpperCase())) {
							checkExtWhite = true;
							break;
						}
					}
					
					if(!checkExtWhite) {
						throw new CustomException(ExceptionCode.INVALID_FILE_EXTENSION);
					}
					
					// 서버에 저장
					file = new File(filePathAdr);
					multipartFile.transferTo(file);
					
					// 파일 권한 설정
					fileHandler.setFileRole(file);
					
					// DRM 복호화
					drm.decrypt(filePathAdr);
					
					// DB에 파일 저장
					AttcFilBEntity attcFilBEntity = AttcFilBEntity.builder()
							.attcFilNo(attcFilNo)
							.attcFilSeq(attcFilSeq++)
							.attcFilPathAdr(filePathAdr)
							.attcFilNm(newFileName)
							.attcFilOgcNm(originalFileName)
							.attcFilMgn(fileSize)
							.attcFilExtnNm(originalFileExtension)
							.useYn("Y")
							.vbgRgnId("SYSTEM")
							.finUpdrId("SYSTEM")
							.build();
					
					attcFilBEntityList.add(attcFilBEntity);
				}
			}
			
			attcFilBJpaRepository.saveAll(attcFilBEntityList);
		}
		
		// 결과 반환
		List<AttcFilB> attcFilBList = AttcFileMapper.Instance.toDtoList(attcFilBEntityList);
		
		return attcFilBList;
	}
	
	// 파일 삭제
	@Override
	public void deleteAttcFile(DeleteAttcFile deleteAttcFile) throws Exception {
		// 복호화
		String attcFilNo = aes256.decrypt(deleteAttcFile.getEncAttcFilNo());
		List<Integer> attcFilSeqList = new ArrayList<>();
		for(String encAttcFilSeq : deleteAttcFile.getEncAttcFilSeqList()) {
			int attcFilSeq = Integer.valueOf(aes256.decrypt(encAttcFilSeq));
			attcFilSeqList.add(attcFilSeq);
		}
		
		// 삭제
		attcFilBQueryRepository.updateOfDelete(attcFilNo, attcFilSeqList);
	}
	
	// 첨부파일 다운로드 항목 조회
	@Override
	public AttcFilB searchAttcFilB(AttcFilB attcFilB) {
		AttcFilBEntity entityList = attcFilBQueryRepository.findOneOfUse(attcFilB);
		return AttcFileMapper.Instance.toDto(entityList);
	}
	
	// 엑셀등록
	@Override
	public String registerExcel(RegisterExcel registerExcel, HttpServletResponse response) throws Exception {
		// 엑셀 등록
		String filePathAdr = fileHandler.registerExcel(registerExcel, response);
		
		// 결과 반환
		return aes256.encrypt(filePathAdr);
	}
	
	// 파일 복사
	@Override
	public String copy(String attcFilNo, String prcScnCd) throws Exception {
		// token으로 정보 조회
		//EeB eeB = jwtProvider.getEeb();
		
		// 데이터 조회
		List<AttcFilBEntity> resAttcFilBEntityList = null;
		if(StringUtils.hasText(attcFilNo)) {
			resAttcFilBEntityList = attcFilBQueryRepository.findOfEntityList(attcFilNo);
		}
		
		if(resAttcFilBEntityList == null || resAttcFilBEntityList.size() ==0 ) {
			return null;
		}
		
		// 신규번호 가져오기
		String nextFilNo = attcFilBQueryRepository.findOfNextFileNo();
		int nextFileSeq = attcFilBQueryRepository.findOfNextFileSeq(attcFilNo);
		
		// 파일 경로
		String absolutePath = fileHandler.getAbsolutePath();
		String detailPath = fileHandler.getDetailPath(prcScnCd);
		String directoryPath = absolutePath + detailPath;
		// 폴더 존재여부 확인 (없으면 생성)		
		File file = new File(directoryPath); 
		fileHandler.checkDirectory(file);
		
		// 파일 복사 및 신규번호 적재하여 저장
		for(AttcFilBEntity resAttcFilBEntity : resAttcFilBEntityList) {
			// 파일 복사
			File sourceFile = new File(resAttcFilBEntity.getAttcFilPathAdr());
			if(!sourceFile.exists()) {
				throw new CustomException(ExceptionCode.INVALID_RESOURCE);
			}
			
			String newFileName = fileHandler.getNewFileName(resAttcFilBEntity.getAttcFilOgcNm(), resAttcFilBEntity.getAttcFilExtnNm());
			String filePathAdr = Paths.get(directoryPath, newFileName).toString();
			File targetFile = new File(filePathAdr);
			
			Files.copy(sourceFile.toPath(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
			
			// 데이터 적재
			AttcFilBEntity attcFilBEntity = AttcFilBEntity.builder()
														  .attcFilNo(nextFilNo)
														  .attcFilSeq(nextFileSeq++)
														  .attcFilPathAdr(filePathAdr)
														  .attcFilNm(newFileName)
														  .attcFilOgcNm(resAttcFilBEntity.getAttcFilOgcNm())
														  .attcFilMgn(resAttcFilBEntity.getAttcFilMgn())
														  .attcFilExtnNm(resAttcFilBEntity.getAttcFilExtnNm())
														  .useYn(resAttcFilBEntity.getUseYn())
														  .vbgRgnId("SYSTEM")
														  .finUpdrId("SYSTEM")
														  .build();
			
			// 데이터 저장
			attcFilBJpaRepository.save(attcFilBEntity);
		}
		
		return nextFilNo;
	}
}
