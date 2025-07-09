package com.sample.basic.sample.code.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.sample.basic.cmm.model.BaseEntity;
import com.sample.basic.sample.code.entity.id.LangComCdPEntityId;

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
@Table(name = "q0047_lang_com_cd_p", schema = "c##khj")
@IdClass(LangComCdPEntityId.class)
public class LangComCdPEntity extends BaseEntity {
	
	@Id private String comCdGrpCd; 	// 공통코드 그룹코드
	@Id private String comCd;		// 공통코드
	@Id private String langCd; 		// 언어코드
	
	private String langComCdNm;		// 언어공통코드명
	private Integer sortSqn;		// 정렬순서 (Default : 1)
	private String useYn;			// 사용여부 (Default : Y)

}
