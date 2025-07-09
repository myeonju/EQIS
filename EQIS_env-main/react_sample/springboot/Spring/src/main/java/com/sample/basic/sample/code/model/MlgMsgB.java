package com.sample.basic.sample.code.model;

import com.sample.basic.cmm.model.Base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * <pre>
 * 
 * </pre>
 * 
 * @author user
 *
 */

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class MlgMsgB extends Base {
	
	private String mlgCd;
	private String langCd;
	private String mlgSbc;
	private String useYn;

}
