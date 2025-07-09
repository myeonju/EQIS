package com.sample.basic.sample.file.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * <pre>
 * 언어공통코드 상세
 * </pre>
 * 
 * @author user
 *
 */

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class AttcFilB {
	// 첨부파일DB
	private String attcFilNo;
	private Integer attcFilSeq;
	private String attcFilOgcNm;
	private Long attcFilMgn;
	private String attcFilExtnNm;
	private String useYn;
	
	// Etc
	private String encAttcFilNo;
	private String encAttcFilSeq;
}
