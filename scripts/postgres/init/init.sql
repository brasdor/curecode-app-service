CREATE USER developer WITH PASSWORD 'developer';

GRANT
  CONNECT
  ON DATABASE curecode_app_service TO developer;

CREATE SCHEMA curecode_app_service;

GRANT USAGE, CREATE 
	ON SCHEMA curecode_app_service 
	TO developer;

ALTER DEFAULT PRIVILEGES 
  IN SCHEMA curecode_app_service
  GRANT ALL ON TABLES 
  TO developer;