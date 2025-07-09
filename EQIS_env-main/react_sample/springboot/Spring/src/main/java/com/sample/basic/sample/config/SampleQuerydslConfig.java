package com.sample.basic.sample.config;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.querydsl.jpa.impl.JPAQueryFactory;

/**
 * <pre>
 * Sample Query DSL 설정파일
 * </pre>
 * 
 * @author user
 *
 */
@Configuration
public class SampleQuerydslConfig {
	
	@PersistenceContext(unitName = "jpa-sample")
	private EntityManager sampleEntityManager;
	
	@Bean(name = "sampleJpaQueryFactory")
	public JPAQueryFactory sampleJpaQueryFactory() {
		return new JPAQueryFactory(sampleEntityManager);
	}
}
