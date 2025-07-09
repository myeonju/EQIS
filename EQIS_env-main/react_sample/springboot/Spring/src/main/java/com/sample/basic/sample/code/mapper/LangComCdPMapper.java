package com.sample.basic.sample.code.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.sample.basic.cmm.mapper.StructMapper;
import com.sample.basic.sample.code.entity.LangComCdPEntity;
import com.sample.basic.sample.code.model.LangComCdP;

@Mapper
public interface LangComCdPMapper extends StructMapper<LangComCdP, LangComCdPEntity> {
	LangComCdPMapper Instance = Mappers.getMapper(LangComCdPMapper.class);

}
