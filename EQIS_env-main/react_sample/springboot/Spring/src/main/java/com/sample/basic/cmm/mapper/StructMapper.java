package com.sample.basic.cmm.mapper;

import java.util.List;

/**
 * <pre>
 * MapStruct 사용을 위한 Mapper 기본구조
 * </pre>
 * @author user
 *
 */

public interface StructMapper<D, E> {
	D toDto(E entity);
	
	E toEntity(D dto);
	
	List<D> toDtoList(List<E> entityList);
	
	List<E> toEntityList(List<D> dtList);
}
