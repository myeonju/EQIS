package com.sample.basic.sample.code.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.sample.basic.cmm.mapper.StructMapper;
import com.sample.basic.sample.code.entity.MlgMsgBEntity;
import com.sample.basic.sample.code.model.MlgMsgB;

@Mapper
public interface MlgMsgBMapper extends StructMapper<MlgMsgB, MlgMsgBEntity>{
	MlgMsgBMapper Instance = Mappers.getMapper(MlgMsgBMapper.class);
}
