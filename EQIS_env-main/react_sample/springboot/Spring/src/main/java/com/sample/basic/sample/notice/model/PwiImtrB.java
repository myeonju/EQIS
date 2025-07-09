package com.sample.basic.sample.notice.model;

import com.sample.basic.cmm.model.Base;

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
public class PwiImtrB extends Base{
	private int pwiImtrNo;
	private String titlNm;
	private String pwiImtrSbc;
	private String pwiYn;
	private String supiFxgYn;
	private String popuYn;
	private String popuStrDtm;
	private String popuFnhDtm;
	private String useYn;
}
