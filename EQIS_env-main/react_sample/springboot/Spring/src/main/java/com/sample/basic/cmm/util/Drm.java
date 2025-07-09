package com.sample.basic.cmm.util;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;


@Component
public class Drm {

	@Value("${drm.key.path}")
	private String drmKeyPath;
	
	@Value("${drm.key.localPath}")
	private String drmKeyLocalPath;
	
	@Value("${drm.config.path}")
	private String drmConfigPath;
	
	@Value("${drm.config.localPath}")
	private String drmConfigLocalPath;
	
	@Value("${drm.authCode}")
	private String drmAuthCode;
	
	@Value("${drm.delDt}")
	private int drmDelDt;
	
	@Value("${drm.readCnt}")
	private int drmReadCnt;
	
	@Value("${drm.printCnt}")
	private int drmPrintCnt;
	
	// 파일 복호화(서버에 업로드할 때 사용)
	public void decrypt(String filePath) throws Exception {
		
		// [Temp comment]
//		String targetPath = filePath.replace(".", "_decrypt.");
//		
//		SLDsFile sldsFile = new SLDsFile();
//		sldsFile.SettingPathForProperty(getConfigPath());
//		int res = sldsFile.CreateDecryptFileDAC(getKeyPath(), "SECURITYDOMAIN", filePath, targetPath);
//		
//		if(res == 0 || res == -36) { // 0 : 정상 복호화, -36: 암호화되어있는 파일이 아님
//			File file = new File(filePath);
//			File target = new File(targetPath);
//			Files.copy(target.toPath(), file.toPath(), StandardCopyOption.REPLACE_EXISTING);
//			target.delete();
//		} else {
//			throw new CustomException(ExceptionCode.BAD_PROCESS);
//		}
	}
	
	// 파일 암호화 (서버파일을 다운로드할 때 사용)
	public String encrypt(String filePath) throws Exception {
		String targetPath = filePath.replace(".", "_encrypt.");
		return targetPath;
		
		// [Temp comment]
//		SLDsFile sldsFile = new SLDsFile();
//		sldsFile.SettingPathForProperty(getConfigPath());
//		sldsFile.SLDsAddUserDAC("SECURITYDOMAIN", drmAuthCode, drmDelDt, drmReadCnt, drmPrintCnt);
//		int res = sldsFile.SLDsEncFileDACV2(getKeyPath(), "SAMPLE", filePath, targetPath, 1);
//		
//		if(res == 0 || res == -71 ) {		// 0: 정상 암호화, -71: 암호화 지원하지 않는 확장자
//			return targetPath;
//		} else {
//			throw new CustomException(ExceptionCode.BAD_PROCESS);
//		}
	}
	
	public String getKeyPath() throws Exception {
		String targetDrmKeyPath = null;
		if(StringUtils.hasText(drmKeyLocalPath)) {
			targetDrmKeyPath = drmKeyLocalPath;
		} else {
			targetDrmKeyPath = drmKeyPath;
		}
		
		if (targetDrmKeyPath.contains("classpath:")) {
			return ResourceUtils.getFile(targetDrmKeyPath).getPath();
		} else {
			return targetDrmKeyPath;
		}
	}
	
	public String getConfigPath() throws Exception {
		String targetDrmConfigPath = null;
		if(StringUtils.hasText(drmConfigLocalPath)) {
			targetDrmConfigPath = drmConfigLocalPath;
		} else {
			targetDrmConfigPath = drmConfigPath;
		}
		
		if (targetDrmConfigPath.contains("classpath:")) {
			return ResourceUtils.getFile(targetDrmConfigPath).getPath();
		} else {
			return targetDrmConfigPath;
		}
	}
	
}
