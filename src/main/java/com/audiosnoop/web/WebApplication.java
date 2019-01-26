package com.audiosnoop.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@ComponentScan({"com.audiosnoop"})
@SpringBootApplication
@RequestMapping
public class WebApplication extends SpringBootServletInitializer implements WebMvcConfigurer {

    // WEB-INF 배포를 위해서 반드시 필요함
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(WebApplication.class);
    }

    @RequestMapping
    public String intro() {
        return "intro.html";
    }

    @RequestMapping(value = "magazine")
    public String magazine() {
        return "src/magazine.html";
    }

    @RequestMapping(value = "mymap")
    public String main() {
        return "src/mymap.html";
    }

    @RequestMapping(value = "search")
    public String search() {
        return "src/search.html";
    }

    @RequestMapping(value = "community")
    public String community() {
        return "src/community.html";
    }

    @RequestMapping(value = "yourmap")
    public String yourmap() {
        return "src/yourmap.html";
    }

    public static void main(String[] args) {
        SpringApplication.run(WebApplication.class, args);
    }
}

