package com.sample.basic.cmm.util;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;

import org.springframework.util.StringUtils;

public class Dateformat {

	public static String toyyyyMMddHHmmss() {
		return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
	}
	public static String toyyyyMM() {
		return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMM"));
	}
	
	public static String toContinuousyyyyMMdd() {
		return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
	}
	
	public static String toContinuousyyyyMMddHHmmss() {
		return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
	}
	
	// System current date
	public static String currentDate() {
		long currentTime = System.currentTimeMillis();
		return new SimpleDateFormat("yyyy-MM-dd").format(new Date(currentTime));
	}
	
	// UTC
	public static String toyyyyMMddHHmmssUTC() {
		return ZonedDateTime.now(ZoneId.of("UTC")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
	}
	
	public static String toContinuousyyyyMMUTC() {
		return ZonedDateTime.now(ZoneId.of("UTC")).format(DateTimeFormatter.ofPattern("yyyyMM"));
	}
	
	public static String toContinuousyyyyMMddUTC() {
		return ZonedDateTime.now(ZoneId.of("UTC")).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
	}

	public static String toContinuousyyyyMMddHHmmssUTC() {
		return ZonedDateTime.now(ZoneId.of("UTC")).format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
	}
	
	// PST(American/LosAngeles) -> KST(Asia/Seoul)
	public static String pst2kstDateTime(String pstDateTime) {
		if (pstDateTime == null || "null".equalsIgnoreCase(pstDateTime)) return null;
		DateTimeFormatter pstFMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);
		ZonedDateTime pstZoneDatetime = LocalDateTime.parse(pstDateTime, pstFMT).atZone(ZoneId.of("America/Los_Angeles"));
		return pstZoneDatetime.withZoneSameInstant(ZoneId.of("Asia/Seoul")).toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
	}
	
	public static String pst2kstDateTimeTSSZ(String pstDateTime) {
		if (pstDateTime == null || "null".equalsIgnoreCase(pstDateTime)) return null;
		DateTimeFormatter pstFMT = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.ENGLISH);
		ZonedDateTime pstZoneDatetime = LocalDateTime.parse(pstDateTime, pstFMT).atZone(ZoneId.of("America/Los_Angeles"));
		return pstZoneDatetime.withZoneSameInstant(ZoneId.of("Asia/Seoul")).toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
	}
	
	public static String pst2kstDate(String pstDateTime) {
		if (pstDateTime == null || "null".equalsIgnoreCase(pstDateTime)) return null;
		DateTimeFormatter pstFMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);
		ZonedDateTime pstZoneDatetime = LocalDateTime.parse(pstDateTime, pstFMT).atZone(ZoneId.of("America/Los_Angeles"));
		return pstZoneDatetime.withZoneSameInstant(ZoneId.of("Asia/Seoul")).toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
	}
	
	public static long pst2kstMillis(String pstDateTime) {
		DateTimeFormatter pstFMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);
		ZonedDateTime pstZoneDatetime = LocalDateTime.parse(pstDateTime, pstFMT).atZone(ZoneId.of("America/Los_Angeles"));
		return pstZoneDatetime.withZoneSameInstant(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli();
	}
	
	public static String pst2kstDateTimeBase(String date) {
		String convertResult = null;
		if (date != null && !"null".equalsIgnoreCase(date) && StringUtils.hasText(date)) {
			convertResult = Dateformat.pst2kstDateTime(date + Constant.TIME_BASE);
		}
		return convertResult;
	}
	
	public static String pst2kstDateBase(String date) {
		String convertResult = null;
		if (date != null && !"null".equalsIgnoreCase(date) && StringUtils.hasText(date)) {
			convertResult = Dateformat.pst2kstDate(date + Constant.TIME_BASE);
		}
		return convertResult;
	}
	
	// KST(Asia/Seoul) -> PST(American/LosAngeles)
	public static String kst2pstDateTime(String kstDateTime) {
		if (kstDateTime == null || kstDateTime.isEmpty()) return null;
		DateTimeFormatter kstFMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.KOREA);
		ZonedDateTime kstZoneDatetime = LocalDateTime.parse(kstDateTime, kstFMT).atZone(ZoneId.of("Asia/Seoul"));
		return kstZoneDatetime.withZoneSameInstant(ZoneId.of("America/Los_Angeles")).toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
	}
	
	public static String kst2pstDateTimeTSSZ(String kstDateTime) {
		if (kstDateTime == null || kstDateTime.isEmpty()) return null;
		DateTimeFormatter kstFMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.KOREA);
		ZonedDateTime kstZoneDatetime = LocalDateTime.parse(kstDateTime, kstFMT).atZone(ZoneId.of("Asia/Seoul"));
		return kstZoneDatetime.withZoneSameInstant(ZoneId.of("America/Los_Angeles")).toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ"));
	}
	
	public static String kst2pstDate(String kstDateTime) {
		if (kstDateTime == null || kstDateTime.isEmpty()) return null;
		DateTimeFormatter kstFMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.KOREA);
		ZonedDateTime kstZoneDatetime = LocalDateTime.parse(kstDateTime, kstFMT).atZone(ZoneId.of("Asia/Seoul"));
		return kstZoneDatetime.withZoneSameInstant(ZoneId.of("America/Los_Angeles")).toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
	}
}
