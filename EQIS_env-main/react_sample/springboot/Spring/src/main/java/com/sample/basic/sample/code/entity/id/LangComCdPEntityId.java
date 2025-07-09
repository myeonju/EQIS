package com.sample.basic.sample.code.entity.id;

import java.io.Serializable;

import javax.persistence.Id;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/** 
 * <pre>
 * Lang Entity Id
 * </pre>
 * 
 * @author user
 *
 */
@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@SuperBuilder
public class LangComCdPEntityId implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id private String comCdGrpCd;
	@Id private String comCd;
	@Id private String langCd;
	
}
