package com.sample.basic.sample.code.model;

import com.sample.basic.cmm.model.Base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CommonCodeListSearch extends Base {

	private String comCdGrpCd;
	private String comCd;
	private String langCd;
	private String langComCdNm;
	
}
