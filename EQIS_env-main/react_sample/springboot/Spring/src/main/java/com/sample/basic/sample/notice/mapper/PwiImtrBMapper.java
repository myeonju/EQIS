package com.sample.basic.sample.notice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.sample.basic.cmm.mapper.StructMapper;
import com.sample.basic.sample.notice.entity.PwiImtrBEntity;
import com.sample.basic.sample.notice.model.PwiImtrB;

/**
 * <pre>
 * 언어공통코드 상세
 * </pre>
 * 
 * @author user
 *
 */

@Mapper
public interface PwiImtrBMapper extends StructMapper<PwiImtrB, PwiImtrBEntity>{
	PwiImtrBMapper Instance = Mappers.getMapper(PwiImtrBMapper.class);

}
