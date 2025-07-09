package com.sample.basic.cmm.model;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.sample.basic.cmm.util.Dateformat;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@SuperBuilder
public class Time {
	
	@Column(updatable = false)
	private String vbgRgstTismp;
	
	private String finMdfyTismp;
	
	// 데이터 생성이 이루어질 때 사전 작업 (LocalDateTime 값을 String으로 변경)
	@PrePersist
	public void prePersist() {
		this.vbgRgstTismp = Dateformat.toyyyyMMddHHmmss();
		this.finMdfyTismp = this.vbgRgstTismp;
	}
	
	// 데이터 업데이트가 이루어질 때 사전 작업 (LocalDateTime 값을 String 으로 변경)
	@PreUpdate
	public void preUpdate() {
		this.finMdfyTismp = Dateformat.toyyyyMMddHHmmss();
	}
	
	
}
