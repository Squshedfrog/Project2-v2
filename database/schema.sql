CREATE DATABASE project2;
\c project2

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    points INTEGER,
    password_digest TEXT
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name TEXT,
    type TEXT,
    skill TEXT,
    ingredients TEXT,
    img_url TEXT,
    recipe text,
    pre_time integer ARRAY,
    cook_time integer ARRAY,
    rating INTEGER,
    user_id INTEGER
    
);
ALTER TABLE recipes ALTER COLUMN cook_time TYPE text;
ALTER TABLE recipes ALTER COLUMN pre_time TYPE integer ARRAY;


INSERT INTO tracks ( name , location , directions , img_url , distance , difficulty , multiday, multi_day , rating ,user_id ) values ( 'juliblee park','sydney glebe' , 'bottom glebe point rd', 'http://www.woolacotts.com.au/news/wp-content/uploads/2014/10/glebe-foreshore.jpg', 5.6, 2 , false ,0, 1, 1 );


