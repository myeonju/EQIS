package com.sample.basic.sample.file.repository;

import static com.sample.basic.sample.file.entity.QAttcFilBEntity.attcFilBEntity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sample.basic.cmm.security.util.Aes256;
import com.sample.basic.cmm.util.Constant;
import com.sample.basic.cmm.util.Dateformat;
import com.sample.basic.sample.file.entity.AttcFilBEntity;
import com.sample.basic.sample.file.mapper.AttcFileMapper;
import com.sample.basic.sample.file.model.AttcFilB;

/**
 * <pre>
 * 언어공통코드상세 Repository
 * </pre>
 * 
 * @author hansik
 *
 */

@Repository
public class AttcFilBQueryRepository {

	@Autowired
	@Qualifier("sampleJpaQueryFactory")
	private JPAQueryFactory jpaQueryFactory;

	@Autowired
	private Aes256 aes256;
	
	public List<AttcFilBEntity> findOfEntityList(String attcFilNo) {
		return jpaQueryFactory.selectFrom(attcFilBEntity)
							  .where(attcFilBEntity.attcFilNo.eq(attcFilNo))
							  .where(attcFilBEntity.useYn.eq("Y"))
							  .fetch();
	}
	
	public List<AttcFilB> findOfList(String attcFilNo) {
		List<AttcFilBEntity> resAttcFilBEntityList = jpaQueryFactory.selectFrom(attcFilBEntity)
																	.where(attcFilBEntity.attcFilNo.eq(attcFilNo))
																	.where(attcFilBEntity.useYn.eq("Y"))
																	.fetch();
		
		List<AttcFilB> attcFilBList = AttcFileMapper.Instance.toDtoList(resAttcFilBEntityList);
		
		for(AttcFilB attcFilB : attcFilBList) {
			attcFilB.setEncAttcFilNo(aes256.encrypt(attcFilB.getAttcFilNo()));
			attcFilB.setEncAttcFilSeq(aes256.encrypt(attcFilB.getAttcFilSeq() + ""));
		}
		
		return attcFilBList;
	}
	
	public List<AttcFilB> findOfList(List<String> attcFilNoList) {
		List<AttcFilBEntity> resAttcFilBEntityList = jpaQueryFactory.selectFrom(attcFilBEntity)
																	.where(attcFilBEntity.attcFilNo.in(attcFilNoList))
																	.where(attcFilBEntity.useYn.eq("Y"))
																	.fetch();
		
		List<AttcFilB> attcFilBList = AttcFileMapper.Instance.toDtoList(resAttcFilBEntityList);
		
		for(AttcFilB attcFilB: attcFilBList) {
			attcFilB.setEncAttcFilNo(aes256.encrypt(attcFilB.getAttcFilNo()));
			attcFilB.setEncAttcFilSeq(aes256.encrypt(attcFilB.getAttcFilSeq() + ""));
		}
		
		return attcFilBList;
	}
	
	// 사용 가능한 파일 조회
	public AttcFilBEntity findOneOfUse(AttcFilB attcFilB) {
		return jpaQueryFactory.selectFrom(attcFilBEntity)
							  .where(attcFilBEntity.attcFilNo.eq(attcFilB.getAttcFilNo()))
							  .where(attcFilBEntity.attcFilSeq.eq(attcFilB.getAttcFilSeq()))
							  .where(attcFilBEntity.useYn.eq("Y"))
							  .fetchOne();
	}
	
	// 다음 첨부파일 번호 가져오기
	public String findOfNextFileNo() {
			Long attcFilSeqMax = jpaQueryFactory.select(attcFilBEntity.attcFilNo.castToNum(Long.class).max())
											   .from(attcFilBEntity)
											   .fetchOne();
			
			return attcFilSeqMax == null ? "1" : (attcFilSeqMax + 1) + "";
	}
	
	// 다음 첨부파일 일련번호 가져오기
	public int findOfNextFileSeq(String attcFilNo) {
		Integer attcFilSeqMax = jpaQueryFactory.select(attcFilBEntity.attcFilSeq.max())
										   .from(attcFilBEntity)
										   .where(attcFilBEntity.attcFilNo.eq(attcFilNo))
										   .fetchOne();
		
		return attcFilSeqMax == null ? 1 : attcFilSeqMax + 1;
	}
	
	// 첨부파일 삭제
	public long updateOfDelete(String attcFilNo, List<Integer> attcFilSeqList) throws Exception {
		return jpaQueryFactory.update(attcFilBEntity)
							  .set(attcFilBEntity.useYn, "N")
							  .set(attcFilBEntity.finUpdrId, "SYSTEM")
							  .set(attcFilBEntity.finMdfyTismp, Dateformat.toyyyyMMddHHmmss())
							  .where(attcFilBEntity.attcFilNo.eq(attcFilNo))
							  .where(attcFilBEntity.attcFilSeq.in(attcFilSeqList))
							  .execute();
	}
	
	// 첨부파일 익명처리
	public long updateOfPrivacy(String attcFilNo) throws Exception {
		return jpaQueryFactory.update(attcFilBEntity)
							  .set(attcFilBEntity.vbgRgnId, Constant.PRIVACY)
							  .set(attcFilBEntity.finUpdrId, Constant.PRIVACY)
							  .set(attcFilBEntity.finMdfyTismp, Dateformat.toyyyyMMddHHmmss())
							  .where(attcFilBEntity.attcFilNo.eq(attcFilNo))
							  .execute();
	}
	
	// interface 첨부파일 삭제.
	// 첨부파일 삭제
	public long updateOfInterfaceDelete(String attcFilNo) throws Exception {
		return jpaQueryFactory.update(attcFilBEntity)
							  .set(attcFilBEntity.vbgRgnId, "N")
							  .set(attcFilBEntity.finUpdrId, "DELETE")
							  .set(attcFilBEntity.finMdfyTismp, Dateformat.toyyyyMMddHHmmss())
							  .where(attcFilBEntity.attcFilNo.eq(attcFilNo))
							  .execute();
	}
}
