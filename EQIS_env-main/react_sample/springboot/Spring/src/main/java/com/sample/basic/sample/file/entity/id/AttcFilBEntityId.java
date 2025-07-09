package com.sample.basic.sample.file.entity.id;

import java.io.Serializable;

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
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@SuperBuilder
public class AttcFilBEntityId implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String attcFilNo;
	private Integer attcFilSeq;
}
