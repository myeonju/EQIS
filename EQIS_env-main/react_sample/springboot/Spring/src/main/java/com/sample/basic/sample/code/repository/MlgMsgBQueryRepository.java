package com.sample.basic.sample.code.repository;

import static com.sample.basic.sample.code.entity.QMlgMsgBEntity.mlgMsgBEntity;

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
import com.sample.basic.sample.code.entity.MlgMsgBEntity;
import com.sample.basic.sample.code.model.LangListGrid;
import com.sample.basic.sample.code.model.LangListSearch;

/**
 * <pre>
 * statement
 * </pre>
 * 
 * @author user
 *
 */
@Repository
public class MlgMsgBQueryRepository {

	@Autowired
	@Qualifier("sampleJpaQueryFactory")
	private JPAQueryFactory jpaQueryFactory;
	
	@Autowired
	private Lang lang;
	
	public List<MlgMsgBEntity> findOfMappingCode(List<String> mlgCdList) {
		return jpaQueryFactory.selectFrom(mlgMsgBEntity)
							  .where(mlgMsgBEntity.mlgCd.in(mlgCdList))
							  .where(mlgMsgBEntity.langCd.eq(lang.getLangCd()))
							  .where(mlgMsgBEntity.useYn.eq("Y"))
							  .fetch();
	}
	
	public Page<LangListGrid> findPageOfListGrid(LangListSearch langListSearch) {
		List<LangListGrid> resLangListGrid = jpaQueryFactory.select(Projections.fields(LangListGrid.class, 
																						mlgMsgBEntity.mlgCd,
																						mlgMsgBEntity.langCd,
																						mlgMsgBEntity.mlgSbc))
															 .from(mlgMsgBEntity)
															 .where(containsIgnoreCaseMlgCd(langListSearch.getMlgCd()))
															 .where(eqLangCd(langListSearch.getLangCd()))
															 .where(containsIgnoreCaseMlgSbc(langListSearch.getMlgSbc()))
															 .where(mlgMsgBEntity.useYn.eq("Y"))
															 .orderBy(mlgMsgBEntity.mlgCd.asc(), mlgMsgBEntity.langCd.asc())
															 .offset((langListSearch.getPage() - 1) * langListSearch.getLimit())
															 .limit(langListSearch.getLimit())
															 .fetch();
		long totalCount = jpaQueryFactory.select(mlgMsgBEntity.count())
										 .from(mlgMsgBEntity)
										 .where(containsIgnoreCaseMlgCd(langListSearch.getMlgCd()))
										 .where(eqLangCd(langListSearch.getLangCd()))
										 .where(containsIgnoreCaseMlgSbc(langListSearch.getMlgSbc()))
										 .where(mlgMsgBEntity.useYn.eq("Y"))
										 .fetchOne();
		return new Page<>(resLangListGrid, totalCount, langListSearch.getPage(), langListSearch.getLimit());
		
	}
	
	public MlgMsgBEntity findOneOfDetail(String mlgCd, String langCd) {
		return jpaQueryFactory.selectFrom(mlgMsgBEntity)
							  .where(mlgMsgBEntity.mlgCd.eq(mlgCd))
							  .where(mlgMsgBEntity.langCd.eq(langCd))
							  .where(mlgMsgBEntity.useYn.eq("Y"))
							  .fetchOne();
	}
	
	// mlgCd 포함여부 확인
	private BooleanExpression containsIgnoreCaseMlgCd(String mlgCd) {
		if (!StringUtils.hasText(mlgCd)) {
			return null;
		}
		return mlgMsgBEntity.mlgCd.containsIgnoreCase(mlgCd);
	}
	
	// langCd 동일여부 확인
	private BooleanExpression eqLangCd(String langCd) {
		if (!StringUtils.hasText(langCd)) {
			return null;
		}
		return mlgMsgBEntity.langCd.eq(langCd);
	}
	
	// mlgNm 포함여부 확인
	private BooleanExpression containsIgnoreCaseMlgSbc(String mlgSbc) {
		if (!StringUtils.hasText(mlgSbc)) {
			return null;
		}
		return mlgMsgBEntity.mlgSbc.containsIgnoreCase(mlgSbc);
	}
	
}
