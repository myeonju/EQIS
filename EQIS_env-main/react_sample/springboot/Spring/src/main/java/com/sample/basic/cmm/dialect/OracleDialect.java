package com.sample.basic.cmm.dialect;

import org.hibernate.dialect.Oracle10gDialect;
import org.hibernate.dialect.function.StandardSQLFunction;
import org.hibernate.type.StringType;

/**
 * <pre>
 * custom Dialect
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */

public class OracleDialect extends Oracle10gDialect {
	
	public OracleDialect() {
		super();
		registerFunction("GET_LANG_COM_CD_NM", new StandardSQLFunction("GET_LANG_COM_CD_NM", new StringType()));	// 공통코드명 조회 함수(COM_CD_GRP_CD, COM_CD, LANG_CD)
	}

}
