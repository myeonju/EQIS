package com.sample.basic.cmm.model;

import javax.persistence.MappedSuperclass;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/** 
 * <pre>
 * 모든 모델의 공통 데이터를 관리
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */

@Data
@MappedSuperclass
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@SuperBuilder
public class Base extends BaseEntity {

	// 조회할 페이지
	private int page;
	
	// 조회 개수
	private int limit;
	
	// 언어
	private String langCd;
}
