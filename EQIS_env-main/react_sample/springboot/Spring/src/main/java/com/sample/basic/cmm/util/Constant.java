package com.sample.basic.cmm.util;

public class Constant {

	public static final String SUCCESS = "Success";
	public static final String FAIL = "Fail";
	public static final String EXIST = "Exist";
	public static final String PRIVACY = "Privacy";
	public static final String FILE_NOT_FOUND = "File Not Found";
	
	// file ext list
	public static final String[] EXT_WHITE_LIST = new String[] {"3GA", "3GP", "9XL", "ACE", "AMR", "ASC", "ASF", "AVI", "BMP", "CAP", "DAT", "DCX", "DIVX", 
			"DOC", "DOCX", "DOT", "EMF", "EML", "EVT", "FLV", "GIF", "GSR", "IMG", "ION", "JPE", "JPEG", "JPG", "M4A", "M4V", "MDI", "MEP", "MHT", "MOD", 
			"MOV", "MP3", "MP4", "MPA", "MPEG", "MPG", "MSG", "MTS", "NAM", "ODP", "ODT", "PCX", "PDF", "PNG", "POT", "POTX", "PPS", "PPSX", "PPT", "PPTX", 
			"PRN", "RAR", "REC", "REM", "RES", "RMVB", "RTF", "SC4", "SHS", "SMK", "SRR", "TDO", "THM", "TIF", "TXT", "VSF", "WAV", "WLMP", "WMV", "XLS", 
			"XLSX", "XLT", "XML", "XPS", "ZIP", "PPTM", "CSV", "JFIF", "7Z", "YXMD"};
	public static final String[] EXT_BLACK_LIST = new String[] {"ASP", "ASPX", "ASA", "CDX", "CER", "HTR", "JSP", "JSPX", "JSW", "JSV", "JSPF", "JAR", 
			"JAVA", "WAR", "CGI", "EXE", "INC", "PHTML", "PHP", "PHP3", "PHP4", "PHP5", "HTM", "HTML", "HTA", "HTX", "MHTM", "MHTML", "MHT", "SHTML", 
			"CHM", "SH"}; 
	
	public static final String SEARCH_TYPE = "SearchType";
	public static final String KEY_LIST = "KeyList";
	public static final String TIME_FROM = "FromTime";
	public static final String TIME_TO = "ToTime";
	public static final String EXPIRED = "Expired";
	public static final String TIME_BASE = " 12:00:00";
	
	// interface ip filter
	public static final String IP_PATTERN_1 = "^(10\\.120\\.19\\.([0-9]{1,255}))$";
	public static final String IP_PATTERN_2 = "^(10\\.119\\.129\\.([0-9]{1,255}))$";
	
	// Seperator
	public static final String SEP_SEMI = ";";
	public static final String SEP_COMA = ",";
	
	// langCd
	public static final String LANG_KO = "KO";
	public static final String LANG_EN = "EN";
	
	// response
	public static final String RESPONSE_DOWNLOAD = "RESPONSE_DOWNLOAD";	// 다운로드되었습니다.
	public static final String RESPONSE_LOGIN = "RESPONSE_LOGIN";		// 로그인되었습니다.
	public static final String RESPONSE_LOGOUT = "RESPONSE_LOGOUT";		// 로그아웃되었습니다.
	public static final String RESPONSE_SAVE = "RESPONSE_SAVE";			// 저장되었습니다.
	public static final String RESPONSE_REGISTER = "RESPONSE_REGISTER";	// 등록되었습니다.
	public static final String RESPONSE_SEARCH = "RESPONSE_SEARCH";		// 조회되었습니다.
	public static final String RESPONSE_ALLOCATE = "RESPONSE_ALLOCATE";	// 할당되었습니다.
	public static final String RESPONSE_CHANGE = "RESPONSE_CHANGE";		// 변경되었습니다.
	public static final String RESPONSE_DELETE = "RESPONSE_DELETE";		// 삭제되었습니다.
	public static final String RESPONSE_CANCLE = "RESPONSE_CANCLE";		// 취소되었습니다.
	public static final String RESPONSE_REQUEST = "RESPONSE_REQUEST";	// 의뢰되었습니다.
	public static final String RESPONSE_DECISION = "RESPONSE_DECISION";	// 결재되었습니다.
	public static final String RESPONSE_APPROVE = "RESPONSE_APPROVE";	// 승인되었습니다.
	public static final String RESPONSE_RETURN = "RESPONSE_RETURN";		// 반려되었습니다.
	public static final String RESPONSE_UPDATE = "RESPONSE_UPDATE";		// 수정되었습니다.
	
	// exception 
	public static final String EXCEPTION_BAD_PROCESS = "EXCEPTION_BAD_PROCESS";	// 처리중 에러가 발생했습니다.
	
	// PrcScnCd
	public static final String DFS = "DFS";
	public static final String SIMS = "SIMS";
	public static final String NAIN = "NAIN";
	public static final String CSEL = "CSEL";
	
	// co_scn_cd
	public static final String SCN_HYUNDAI = "H";
	public static final String SCN_KIA = "K";
	
	// interface
	public static final String HMA_FR02_OUT = "HSIMS2CMT_GSI_FR02_OUT";
	public static final String HMA_FR04_IN = "HCMT2SIMS_GSI_FR04_IN";
	public static final String HMA_FR05_IN = "HCMT2SIMS_GSI_FR05_IN";
	public static final String HMA_FR05_OUT = "HCMT2SIMS_GSI_FR05_OUT";
	public static final String HMA_FR07_OUT = "HCMT2SIMS_GSI_FR07_OUT";
	public static final String HMA_FR02_OUT_RES = "HCMT2SIMS_GSI_FR02_OUT_RES";
	public static final String HMA_FR05_OUT_RES = "HCMT2SIMS_GSI_FR05_OUT_RES";
	public static final String HMA_FR07_OUT_RES = "HCMT2SIMS_GSI_FR07_OUT_RES";
	public static final String HMA_CODES_IN = "HCMT2SIMS_CODES_IN";
	public static final String HMA_ENGINE_DESC_IN = "HCMT2SIMS_ENGINE_DESC_IN";
	
	public static final String KUS_FR02_OUT = "KSIMS2CMT_GSI_FR02_OUT";
	public static final String KUS_FR04_IN = "KSIMS2CMT_GSI_FR04_IN";
	public static final String KUS_FR05_IN = "KSIMS2CMT_GSI_FR05_IN";
	public static final String KUS_FR05_OUT = "KSIMS2CMT_GSI_FR05_OUT";
	public static final String KUS_FR07_OUT = "KSIMS2CMT_GSI_FR07_OUT";
	public static final String KUS_FR02_0UT_RES = "KSIMS2CMT_GSI_FR02_OUT_RES";
	public static final String KUS_FR05_0UT_RES = "KSIMS2CMT_GSI_FR05_OUT_RES";
	public static final String KUS_FR07_0UT_RES = "KSIMS2CMT_GSI_FR07_OUT_RES";
	public static final String KUS_CODES_IN = "KCMT2SIMS_CODES_IN";
	public static final String KUS_WPART_IN = "KCMT2SISM_WPART_IN";
	
	// stepCd
	public static final String STEP_DFS10 = "DFS10";
	public static final String STEP_DFS20 = "DFS20";
	public static final String STEP_DFS30 = "DFS30";
	public static final String STEP_SIMS10 = "SIMS10";
	public static final String STEP_SIMS20 = "SIMS20";
	public static final String STEP_NAIN10 = "NAIN10";
	public static final String STEP_NAIN20 = "NAIN20";
	
	// opsGrpCd
	public static final String OPS_GRP_DFS10 = "DFS10";
	public static final String OPS_GRP_DFS20 = "DFS20";
	public static final String OPS_GRP_DFS30 = "DFS30";
	public static final String OPS_GRP_SIMS10 = "SIMS10";
	public static final String OPS_GRP_SIMS20 = "SIMS20";
	public static final String OPS_GRP_NAIN10 = "NAIN10";
	public static final String OPS_GRP_NAIN20 = "NAIN20";
	
	// pos
	public static final String POA_01 = "01";	// 중역
	public static final String POA_02 = "02";	// 팀장
	public static final String POA_03 = "03";	// 그룹장
	public static final String POA_04 = "04";	// 담당
	
	// AffrTrtmPrcId
	public static final String PROCESS_1RVWCRGTALTR = "1RVWCRGTALTR";	// 1차검토 담당부서변경
	public static final String PROCESS_1RVWCRGRALCT = "1RVWCRGRALCT";	// 1차검토 담당자할당
	public static final String PROCESS_1RVWCRGRALTR = "1RVWCRGRALTR";	// 1차검토 담당자변경
	public static final String PROCESS_1RVWALCTCNCL = "1RVWALCTCNCL";	// 1차검토 할당취소
	public static final String PROCESS_2RVWRQSAVE = "2RVWRQSAVE";		// 2차검토 의뢰저장
	public static final String PROCESS_2RVWRQDEL = "2RVWRQDEL";			// 2차검토 의뢰삭제
	public static final String PROCESS_2RVWRQ = "2RVWRQ";				// 2차검토 의뢰
	public static final String PROCESS_2RVWRRQ = "2RVWRRQ";				// 2차검토 재의뢰
	public static final String PROCESS_2RVWCRGTALTR = "2RVWCRGTALTR";	// 2차검토 담당부서변경
	public static final String PROCESS_2RVWCRGRALCT = "2RVWCRGRALCT";	// 2차검토 담당자할당
	public static final String PROCESS_2RVWCRGRALTR = "2RVWCRGRALTR";	// 2차검토 담당자변경
	public static final String PROCESS_2RVWALCTCNCL = "2RVWALCTCNCL";	// 2차검토 할당취소
	public static final String PROCESS_3RVWRQSAVE = "3RVWRQSAVE";		// 3차검토 의뢰저장
	public static final String PROCESS_3RVWRQDEL = "3RVWRQDEL";			// 3차검토 의뢰삭제
	public static final String PROCESS_3RVWRQ = "3RVWRQ";				// 3차검토 의뢰
	public static final String PROCESS_3RVWRRQ = "3RVWRRQ";				// 3차검토 재의뢰
	public static final String PROCESS_3RVWCRGTALTR = "3RVWCRGTALTR";	// 3차검토 담당부서변경
	public static final String PROCESS_3RVWCRGRALCT = "3RVWCRGRALCT";	// 3차검토 담당자할당
	public static final String PROCESS_3RVWCRGRALTR = "3RVWCRGRALTR";	// 3차검토 담당자변경
	public static final String PROCESS_3RVWALCTCNCL = "3RVWALCTCNCL";	// 3차검토 할당취소
	
	// 검토결과
	public static final String PROCESS_1RVWRSLTSAVE = "1RVWRSLTSAVE";		// 1차검토 결과저장
	public static final String PROCESS_1RVWRSLTFRAMDEL = "1RVWRSLTFRAMDEL";	// 1차검토 결과작성삭제
	public static final String PROCESS_1RVWRDCS = "1RVWRDCS";				// 1차검토 결재상신
	public static final String PROCESS_1RVWGVB = "1RVWGVB";					// 1차검토 반려
	public static final String PROCESS_1RVWFINRDCS = "1RVWFINRDCS";			// 1차검토 최종결재	
	public static final String PROCESS_2RVWRSLTSAVE = "2RVWRSLTSAVE";		// 2차검토 결과저장
	public static final String PROCESS_2RVWRSLTFRAMDEL = "2RVWRSLTFRAMDEL";	// 2차검토 결과작성삭제
	public static final String PROCESS_2RVWRDCS = "2RVWRDCS";				// 2차검토 결재상신
	public static final String PROCESS_2RVWGVB = "2RVWGVB";					// 2차검토 반려
	public static final String PROCESS_2RVWFINRDCS = "2RVWFINRDCS";			// 2차검토 최종결재	
	public static final String PROCESS_3RVWRSLTSAVE = "3RVWRSLTSAVE";		// 1차검토 결과저장
	public static final String PROCESS_3RVWRSLTFRAMDEL = "3RVWRSLTFRAMDEL";	// 1차검토 결과작성삭제
	public static final String PROCESS_3RVWRDCS = "3RVWRDCS";				// 1차검토 결재상신
	public static final String PROCESS_3RVWGVB = "3RVWGVB";					// 1차검토 반려
	public static final String PROCESS_3RVWFINRDCS = "3RVWFINRDCS";			// 1차검토 최종결재
	
	
}
