package com.sample.basic.sample.code.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sample.basic.sample.code.entity.MlgMsgBEntity;
import com.sample.basic.sample.code.entity.id.MlgMsgBEntityId;

/**
 * <pre>
 * statement
 * </pre>
 * 
 * @author user
 *
 */

public interface MlgMsgBJpaRepository extends JpaRepository<MlgMsgBEntity, MlgMsgBEntityId> {

}
