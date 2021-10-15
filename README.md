# SwisscomAssignment

# Installation Guide

# Pre Requisite

1. MYSQL Installation 
2. NPM

1. MYSQL Installation - I have followed the installation using the below link 
https://www.onlinetutorialspoint.com/mysql/install-mysql-on-windows-10-step-by-step.html

# Project Installation

1. Backend Installation:

I would suggest to use Eclipse or IntelliJ IDEA 2021.2.2 IDE and import featuretoggle folder

2. Frontend Installation:

Go to Frontend folder and run npm install

# Configuration

1. DB Configuration 

Edit the file according to the below configurati in IDE
on src/main/resources/application.properties

spring.datasource.url=jdbc:mysql://localhost:<port_no>/<database_name>  
spring.datasource.username=<database_user_name>  
spring.datasource.password=<database_password>  
spring.jpa.show-sql=true  
spring.jpa.hibernate.ddl-auto=update  
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5Dialect  

2. FrontEnd Configuration

Edit the apiBaseUrl in file src\environments\environment.ts

# Commands to run the project 

1. Backend 

Run the file src/main/java/com/swisscom/featuretoggle/FeaturetoggleApplication.java in IDE

2. FrontEnd

In frontend folder run the command "ng serve"

# NOTE

Login Credentials for enabling features   
``
Username - sumaiya
``
``
Password - 1234  
``


