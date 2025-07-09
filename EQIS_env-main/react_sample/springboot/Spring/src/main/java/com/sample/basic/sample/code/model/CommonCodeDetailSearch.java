package com.sample.basic.sample.code.model;

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
public class CommonCodeDetailSearch {
	
	private String comCdGrpCd;
	private String comCd;
	private String langCd;
	
}
