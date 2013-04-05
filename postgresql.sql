/*
 * 1. PowerShell change Path: $env:path = $env.path + 'D:\Program Files\PostgreSQL\9.2\bin\'
 * 2. > chcp 437 # change language to region to US.
 * 3. login: heroku pg:psql HEROKU_POSTGRESQL_COPPER.
 * 4. Remember to put ; at the end of statement.
 * 
 */


/*
 * NOTE:
 * 1. when adding strings, use ' instead of "
 * 
 */


/* Show all tables that I have created */
select * from information_schema.tables where table_schema='public';

/* drop table */
drop table test;

create table users (
	uid SERIAL Primary key,
	username varchar(40),
	facebookid integer,
	twitterid integer,
	friends integer[]
);

create table token (
	uid SERIAL references users(uid),
	token varchar(80)
)

/* 
 * Add token column to users
 */
alter table users add column token varchar(80);

/*
 * Set Primary Key
 */
alter table users add primary key (uid);

/*
 * Return primary key:
 */
SELECT               
  pg_attribute.attname, 
  format_type(pg_attribute.atttypid, pg_attribute.atttypmod) 
FROM pg_index, pg_class, pg_attribute 
WHERE 
  pg_class.oid = 'Users'::regclass AND
  indrelid = pg_class.oid AND
  pg_attribute.attrelid = pg_class.oid AND 
  pg_attribute.attnum = any(pg_index.indkey)
  AND indisprimary;
  
/*
 * Describe table
 */  
\d+ users

select * from users;

insert into users (username, facebookid, twitterid) values ('dongminator', 12345, 23456)