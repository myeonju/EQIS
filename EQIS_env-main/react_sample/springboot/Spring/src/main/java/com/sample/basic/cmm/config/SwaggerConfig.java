package com.sample.basic.cmm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

/**
 * <pre>
 * Swagger 설정 파일
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */

@Configuration
//@EnableWagger2
@Profile("dev")
public class SwaggerConfig extends WebMvcConfigurationSupport {
	
//	private ApiInfo apiInfo() {
//		return new ApiInfoBuilder().title("Sample Swagger")
//									.description("Information Management API")
//									.version("0.0.1")
//									.build();
//	}
//	
//	@Bean
//	public Docket docket() {
//		return new Docket(DocumentationType.SWAGGER_2).select()
//														.apis(RequestHandlerSelectors.any())
//														.paths(PathSelectors.any())
//														.build()
//														.apiInfo(apiInfo());
//	}
//	
//	@Override
//	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		registry.addResourceHandler("/swagger-ui/**").addResourceLocations("classpath:/META-INF/resources/webjars/springfox-swagger-ui/");
//		registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/springfox-swagger-ui/");
//	}

}
