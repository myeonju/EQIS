package com.sample.basic.cmm.security.util;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.text.translate.AggregateTranslator;
import org.apache.commons.text.translate.CharSequenceTranslator;
import org.apache.commons.text.translate.LookupTranslator;

import com.fasterxml.jackson.core.SerializableString;
import com.fasterxml.jackson.core.io.CharacterEscapes;
import com.fasterxml.jackson.core.io.SerializedString;

import edu.emory.mathcs.backport.java.util.Collections;

/**
 * <pre>
 * 문자를 변형해주는 클래스 즉, 특수문자가 올 경우 문자/숫자 형태로 변형해서 해킹을 방지한다.
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */

public class HtmlCharacterEscapes extends CharacterEscapes {
	
	private final int[] asciiEscapes;
	
	private final CharSequenceTranslator translator;
	
	public HtmlCharacterEscapes() {
		
		/**
		 * 여기에서 커스터마이징 가능
		 * 이전의 Apache Commons Lang3 는 LookupTranslator 의 파라미터로 String[][]을 전달하였으나,
		 * 새로운 Apache Commons Text 는 파라미터로 Map<CharSequence, CharSequence>를 전달해야 한다.
		 */
		Map<CharSequence, CharSequence> customMap = new HashMap<>();
//		customMap.put("\'", "&#39;");
//		customMap.put("\"", "&quot;");
//		customMap.put(":", "&#58;");
//		customMap.put(";", "&#59;");
//		customMap.put("(", "&#40;");
//		customMap.put(")", "&#41;");		
		customMap.put("<", "&lt;");
		customMap.put(">", "&gt;");
//		customMap.put("{", "&#123;");
//		customMap.put("}", "&#125;");
//		customMap.put("#", "&#35;");
//		customMap.put("$", "&#36;");
//		customMap.put("%", "&#37;");
//		customMap.put("@", "&#64;");
//		customMap.put("&", "&amp;");
//		customMap.put("?", "&#63;");
//		customMap.put("!", "&#33;");
//		customMap.put("*", "&#42;");
//		customMap.put("|", "&#124;");
		
		Map<CharSequence, CharSequence> customEscape = Collections.unmodifiableMap(customMap);
		
		// XSS 방지 처리할 특수 문자 지정 '\":;()<>#$%@&?!*|
		asciiEscapes = CharacterEscapes.standardAsciiEscapesForJSON();
		
//		asciiEscapes['\''] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['\"'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes[':'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes[';'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['('] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes[')'] = CharacterEscapes.ESCAPE_CUSTOM;		
		asciiEscapes['<'] = CharacterEscapes.ESCAPE_CUSTOM;
		asciiEscapes['>'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['{'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['}'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['#'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['$'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['%'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['@'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['&'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['?'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['!'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['*'] = CharacterEscapes.ESCAPE_CUSTOM;
//		asciiEscapes['|'] = CharacterEscapes.ESCAPE_CUSTOM;
		
		// XSS 방지 처리 특수 문자 인코딩 값 지정
		translator = new AggregateTranslator(
//				new LookupTranslator(EntityArrays.BASIC_ESCAPE), 	// <, >, &, " 는 여기에 포함됨
//				new LookupTranslator(EntityArrays.ISO8859_1_ESCAPE),
//				new LookupTranslator(EntityArrays.HTML40_EXTENDED_ESCAPE),
				new LookupTranslator(customEscape)
		);
	}

	@Override
	public int[] getEscapeCodesForAscii() {
		return asciiEscapes;
	}

	@Override
	public SerializableString getEscapeSequence(int ch) {
		return new SerializedString(translator.translate(Character.toString((char) ch)));
		// 참고 - 커스터마이징이 필요없다면 아래와 같이 Apache Commons Text에서 제공하는 메서드를 써도 됨.
//		return new SerializedString(StringEscapeUtils.escapeHtml4(Character.toString((char) ch)));
	}
	
}
