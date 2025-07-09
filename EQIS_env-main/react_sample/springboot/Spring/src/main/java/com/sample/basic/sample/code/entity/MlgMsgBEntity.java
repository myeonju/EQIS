package com.sample.basic.sample.code.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import com.sample.basic.cmm.model.BaseEntity;
import com.sample.basic.sample.code.entity.id.MlgMsgBEntityId;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * <pre>
 * 
 * </pre>
 * 
 * @author hansik
 *
 */
@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "q0047_mlg_msg_b")
@IdClass(MlgMsgBEntityId.class)
public class MlgMsgBEntity extends BaseEntity {
	@Id private String mlgCd;
	@Id private String langCd;
	
	private String mlgSbc;
	
	@ColumnDefault("Y")
	private String useYn;
}
