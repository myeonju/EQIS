package com.sample.basic.sample.file.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.sample.basic.cmm.mapper.StructMapper;
import com.sample.basic.sample.file.entity.AttcFilBEntity;
import com.sample.basic.sample.file.model.AttcFilB;

/**
 * <pre>
 * 언어공통코드 상세
 * </pre>
 * 
 * @author user
 *
 */

@Mapper
public interface AttcFileMapper extends StructMapper<AttcFilB, AttcFilBEntity>{
	AttcFileMapper Instance = Mappers.getMapper(AttcFileMapper.class);
}
