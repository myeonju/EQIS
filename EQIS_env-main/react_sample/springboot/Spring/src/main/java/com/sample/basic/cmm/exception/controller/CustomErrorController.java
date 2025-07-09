package com.sample.basic.cmm.exception.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

/**
 * <pre>
 * DispatcherServlet 이전의 영역(Filter 등)에서 Exception 처리를 구현한다.
 * &#64;ControllerAdvice/@ExceptionHandler에서 처리되지 않은 Exception의 경우 여기서 처리된다.
 * errorHtml 함수 안에 공통으로 처리 할 로직을 구현하면, mediatype이 text/html 이럴 경우 실행된다.
 * error 함수안에 공통으로 처리 할 로직을 구현한다면, rest 통신시 json 형태의 에러 처리를 한다. 
 * 
 * </pre>
 * @author user
 * @since 2023.01.01
 * @see
 */

@Controller
@RequestMapping("${server.error.path:${error.path:/error}}")
@Slf4j
public class CustomErrorController extends BasicErrorController {

	public CustomErrorController(ErrorAttributes errorAttributes, ServerProperties serverProperties,
			List<ErrorViewResolver> errorViewResolvers) {
		super(errorAttributes, serverProperties.getError(), errorViewResolvers);
	}
	
	/**
	 * mediatype이 text/html일 경우 실행된다.
	 * 결과를 화면명으로 리턴한다.
	 * 
	 * @param request
	 * @param response
	 * @return ModelView
	 */
	@RequestMapping(produces = MediaType.TEXT_HTML_VALUE)
	public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
		// return super.errorHtml(request, response);
		HttpStatus status = getStatus(request);
		Map<String, Object> model = Collections.unmodifiableMap(getErrorAttributes(request, getErrorAttributeOptions(request, MediaType.TEXT_HTML)));
		// response.setStatus(status.value());
		response.setStatus(200);
		ModelAndView modelAndView = resolveErrorView(request, response, status, model);
		return (modelAndView != null) ? modelAndView : new ModelAndView("common/defaultErrorView", model);
	}

	/**
	 * error 함수 안에 공통으로 처리 할 로직을 구현한다.
	 * error 함수는 보통 rest통신시 json 형태의 에러 처리를 구현한다.
	 * 
	 * @param request
	 * @return ResponseEntity
	 * @see org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController#error(HttpServletRequest)javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
		
		// return super.error(request);
		HttpStatus status = getStatus(request);
		if (status == HttpStatus.NO_CONTENT) {
			return new ResponseEntity<>(status);
		}
		
		return new ResponseEntity<Map<String, Object>>(new HashMap<>(), HttpStatus.CONFLICT);
	}
	
	/**
	 * 로그형태를 공통으로 만들경우 사용한다.
	 * 
	 * @param request
	 */
	private void logger(HttpServletRequest request) {
	}

}
