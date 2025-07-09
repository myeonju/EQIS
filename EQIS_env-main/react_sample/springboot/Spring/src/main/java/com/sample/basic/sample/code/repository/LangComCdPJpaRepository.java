package com.sample.basic.sample.code.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sample.basic.sample.code.entity.LangComCdPEntity;
import com.sample.basic.sample.code.entity.id.LangComCdPEntityId;

/**
 * <pre>
 * 언어공통코드상세 jpa repository
 * </pre>
 * 
 * @author user
 *
 */

public interface LangComCdPJpaRepository extends JpaRepository<LangComCdPEntity, LangComCdPEntityId>{

}
