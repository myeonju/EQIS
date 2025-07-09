package com.sample.basic.sample.file.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.sample.basic.cmm.model.BaseEntity;
import com.sample.basic.sample.file.entity.id.AttcFilBEntityId;

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
@Entity
@Table(name = "q0047_attc_fil_b")
@IdClass(AttcFilBEntityId.class)
public class AttcFilBEntity extends BaseEntity {
	
	@Id private String attcFilNo;
	@Id private Integer attcFilSeq;
	private String attcFilPathAdr;
	private String attcFilNm;
	private String attcFilOgcNm;
	private Long attcFilMgn;
	private String attcFilExtnNm;
	private String useYn;
}
