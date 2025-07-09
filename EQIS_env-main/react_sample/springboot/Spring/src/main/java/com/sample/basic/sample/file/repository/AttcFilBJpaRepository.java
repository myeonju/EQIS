package com.sample.basic.sample.file.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sample.basic.sample.file.entity.AttcFilBEntity;
import com.sample.basic.sample.file.entity.id.AttcFilBEntityId;

/**
 * <pre>
 * 언어공통코드상세 jpa repository
 * </pre>
 * 
 * @author user
 *
 */

public interface AttcFilBJpaRepository extends JpaRepository<AttcFilBEntity, AttcFilBEntityId>{

}
