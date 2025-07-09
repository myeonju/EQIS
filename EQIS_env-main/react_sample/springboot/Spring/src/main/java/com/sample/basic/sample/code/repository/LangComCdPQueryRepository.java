package com.sample.basic.sample.code.repository;

import static com.sample.basic.sample.code.entity.QLangComCdPEntity.langComCdPEntity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import com.sample.basic.cmm.model.Page;
import com.sample.basic.cmm.util.Lang;
import com.sample.basic.sample.code.entity.LangComCdPEntity;
import com.sample.basic.sample.code.model.CommonCodeListGrid;
import com.sample.basic.sample.code.model.CommonCodeListSearch;

/**
 * <pre>
 * 언어공통코드상세 Repository
 * </pre>
 * 
 * @author hansik
 *
 */

@Repository
public class LangComCdPQueryRepository {

	@Autowired
	@Qualifier("sampleJpaQueryFactory")
	private JPAQueryFactory jpaQueryFactory;
	
	@Autowired
	private Lang lang;
	
	// 매핑코드 조회
	public List<LangComCdPEntity> findOfMappingCode(List<String> comCdGrpCdList) {
		return jpaQueryFactory.selectFrom(langComCdPEntity)
							  .where(langComCdPEntity.comCdGrpCd.in(comCdGrpCdList))
							  .where(langComCdPEntity.langCd.eq(lang.getLangCd()))
							  .where(langComCdPEntity.useYn.eq("Y"))
							  .orderBy(langComCdPEntity.sortSqn.asc())
							  .fetch();
	}
	
	// 상세 조회
	public LangComCdPEntity findOneOfDetail(String comCdGrpCd, String comCd, String langCd) {
		return jpaQueryFactory.selectFrom(langComCdPEntity)
							  .where(langComCdPEntity.comCdGrpCd.eq(comCdGrpCd))
							  .where(langComCdPEntity.comCd.eq(comCd))
							  .where(langComCdPEntity.langCd.eq(langCd))
							  .where(langComCdPEntity.useYn.eq("Y"))
							  .fetchOne();
	}
	
	// 이름 조회
	public String findOneOfLangComCdNm(String comCdGrpCd, String comCd, String langCd) {
		return jpaQueryFactory.select(langComCdPEntity.langComCdNm)
							  .from(langComCdPEntity)
							  .where(langComCdPEntity.comCdGrpCd.eq(comCdGrpCd))
							  .where(langComCdPEntity.comCd.eq(comCd))
							  .where(langComCdPEntity.langCd.eq(langCd))
							  .where(langComCdPEntity.useYn.eq("Y"))
							  .fetchOne();
	}
	
	// grid목록 조회
	public Page<CommonCodeListGrid> findPageOfListGrid(CommonCodeListSearch commonCodeListSearch) {
		// 데이터 조회
		List<CommonCodeListGrid> resCommonCodeListGridList = jpaQueryFactory.select(Projections.fields(CommonCodeListGrid.class,
																										langComCdPEntity.comCdGrpCd,
																										langComCdPEntity.comCd,
																										langComCdPEntity.langCd,
																										langComCdPEntity.langComCdNm,
																										langComCdPEntity.sortSqn))
																			.from(langComCdPEntity)
																			.where(containsIgnoreCaseComCdGrpCd(commonCodeListSearch.getComCdGrpCd()))
																			.where(containsIgnoreCaseComCd(commonCodeListSearch.getComCd()))
																			.where(eqLangCd(commonCodeListSearch.getLangCd()))
																			.where(containsIgnoreCaseLangComCdNm(commonCodeListSearch.getLangComCdNm()))
																			.where(langComCdPEntity.useYn.eq("Y"))
																			.orderBy(langComCdPEntity.comCdGrpCd.asc(),
																					langComCdPEntity.comCd.asc(),
																					langComCdPEntity.langCd.asc(),
																					langComCdPEntity.sortSqn.asc())
																			.offset((commonCodeListSearch.getPage() - 1) * commonCodeListSearch.getLimit())
																			.limit(commonCodeListSearch.getLimit())
																			.fetch();
		// 전체 갯수 조회
		long totalCount = jpaQueryFactory.select(langComCdPEntity.count())
										 .from(langComCdPEntity)
										 .where(containsIgnoreCaseComCdGrpCd(commonCodeListSearch.getComCdGrpCd()))
										 .where(containsIgnoreCaseComCd(commonCodeListSearch.getComCd()))
										 .where(eqLangCd(commonCodeListSearch.getLangCd()))
									 	 .where(containsIgnoreCaseLangComCdNm(commonCodeListSearch.getLangComCdNm()))
									 	 .where(langComCdPEntity.useYn.eq("Y"))
									 	 .fetchOne();
		
		// 결과 반환
		return new Page<>(resCommonCodeListGridList, totalCount, commonCodeListSearch.getPage(), commonCodeListSearch.getLimit());
		
	}
	
	
//	// 공통코드그룹코드 포함여부 확인
	private BooleanExpression containsIgnoreCaseComCdGrpCd(String comCdGrpCd) {
		if (!StringUtils.hasText(comCdGrpCd)) {
			return null;
		}
		return langComCdPEntity.comCdGrpCd.containsIgnoreCase(comCdGrpCd);
	}
	
	// 공통코드 포함여부 확인
	private BooleanExpression containsIgnoreCaseComCd(String comCd) {
		if (!StringUtils.hasText(comCd)) {
			return null;
		}
		return langComCdPEntity.comCd.containsIgnoreCase(comCd);
	}
	
	// 언어코드 동일 여부 확인
	private BooleanExpression eqLangCd(String langCd) {
		if (!StringUtils.hasText(langCd)) {
			return null;
		}
		return langComCdPEntity.langCd.eq(langCd);
	}
	
	// 언어공통코드명 포함여부 확인
	private BooleanExpression containsIgnoreCaseLangComCdNm(String langComCdNm) {
		if (!StringUtils.hasText(langComCdNm)) {
			return null;
		}
		return langComCdPEntity.langComCdNm.containsIgnoreCase(langComCdNm);
	}
	
}
