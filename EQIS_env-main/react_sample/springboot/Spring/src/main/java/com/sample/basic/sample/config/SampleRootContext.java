package com.sample.basic.sample.config;

import java.io.IOException;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.sample.basic.cmm.security.util.Aes256;

/**
 * <pre>
 * Sample DB 와 관련된 설정을 한다.
 * </pre>
 * @author user
 *
 */

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = {"com.sample.basic.sample.**.repository"}, entityManagerFactoryRef = "sampleEntityManagerFactory")
public class SampleRootContext {
	
	@Value("${spring.sample.datasource.driver-class-name}")
	private String dirverClassName;
	
	@Value("${spring.sample.datasource.url}")
	private String url;
	
	@Value("${spring.sample.datasource.username}")
	private String username;
	
	@Value("${spring.sample.datasource.password}")
	private String password;
	
	@Autowired
	private Aes256 aes256;
	
	// Datasource 등록
	@Bean
	public DataSource sampleDatasource() {
		BasicDataSource sampleDatasource = new BasicDataSource();
		sampleDatasource.setDriverClassName(dirverClassName);
		sampleDatasource.setUrl(url);
		sampleDatasource.setUsername(username);
		sampleDatasource.setPassword(aes256.decrypt(password));
		
		return sampleDatasource;
	}
	
	// JPA 등록
	@Bean(name = "sampleEntityManagerFactory")
	public LocalContainerEntityManagerFactoryBean sampleEntityManagerFactory() throws IOException {
		LocalContainerEntityManagerFactoryBean sampleEntityManagerFactory = new LocalContainerEntityManagerFactoryBean();
		sampleEntityManagerFactory.setDataSource(sampleDatasource());
		sampleEntityManagerFactory.setPersistenceUnitName("jpa-sample");
		sampleEntityManagerFactory.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
		
		return sampleEntityManagerFactory;
	}

	// Transactional 설정
	@Bean(name = "transactionManager")
	public PlatformTransactionManager transactionManager() throws Exception {
		// JPA Transactional
		JpaTransactionManager jpaTransactionManager = new JpaTransactionManager();
		jpaTransactionManager.setEntityManagerFactory(sampleEntityManagerFactory().getObject());
		return jpaTransactionManager;
	}
	

}
