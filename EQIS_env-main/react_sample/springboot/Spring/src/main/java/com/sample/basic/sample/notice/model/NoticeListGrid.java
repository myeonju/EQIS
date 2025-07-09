package com.sample.basic.sample.notice.model;

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
public class NoticeListGrid {
	private int pwiImtrNo;
	private String titlNm;
	private String pwiImtrSbc;
	private String pwiNm;
	private String supiFxgNm;
	private String popuNm;
	private String popuStrDtm;
	private String popuFnhDtm;
}
