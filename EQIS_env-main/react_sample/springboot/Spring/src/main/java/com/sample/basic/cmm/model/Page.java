package com.sample.basic.cmm.model;

import java.util.List;

import lombok.Getter;

@Getter
public class Page<D> {

	private List<D> data;
	private long totalCount;
	private int totalPage;
	private int page;
	private int limit;
	
	public Page(List<D> data, long totalCount, int totalPage, int page, int limit) {
		this.data = data;
		this.totalCount = totalCount;
		this.totalPage = totalPage;
		this.page = page;
		this.limit = limit;
	}
	
	public Page(List<D> data, long totalCount, int page, int limit) {
		this.data = data;
		this.totalCount = totalCount;
		this.totalPage = (int)Math.ceil((double)totalCount / limit);
		this.page = page;
		this.limit = limit;
	}
	
}
