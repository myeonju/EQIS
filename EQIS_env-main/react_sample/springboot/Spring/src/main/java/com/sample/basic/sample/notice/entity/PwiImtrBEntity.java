package com.sample.basic.sample.notice.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sample.basic.cmm.model.BaseEntity;

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
@Table(name = "q0047_pwi_imtr_b")
public class PwiImtrBEntity extends BaseEntity {
	
	@Id private int pwiImtrNo;
	private String titlNm;
	private String pwiImtrSbc;
	private String pwiYn;
	private String supiFxgYn;
	private String popuYn;
	private String popuStrDtm;
	private String popuFnhDtm;
	private String useYn;
}
