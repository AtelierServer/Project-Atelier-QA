DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\c sdc;

DROP TABLE if exists questions;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id TEXT,
  question_body TEXT,
  unix_date BIGINT,
  asker_name TEXT,
  asker_email TEXT,
  reported INT,
  question_helpfulness INT,
  posted_date TIMESTAMP WITH TIME ZONE
);

DROP TABLE if exists answers;

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id TEXT,
  body TEXT,
  unix_date BIGINT,
  answerer_name TEXT,
  answerer_email TEXT,
  reported INT,
  helpfulness INT,
  posted_date TIMESTAMP WITH TIME ZONE
);

DROP TABLE if exists photos;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_id TEXT,
  url TEXT
);

\copy questions (id, product_id, question_body, unix_date, asker_name, asker_email, reported, question_helpfulness) FROM 'database/data/questions.csv' WITH (FORMAT csv, DELIMITER ',', HEADER true, NULL 'null');

\copy answers(id, question_id, body, unix_date, answerer_name, answerer_email, reported, helpfulness) FROM './database/data/answers.csv' WITH (FORMAT csv, DELIMITER ',', HEADER true, NULL 'null');

\copy photos FROM './database/data/answers_photos.csv' WITH (FORMAT csv, DELIMITER ',', HEADER true, NULL 'null');

UPDATE questions SET posted_date = to_timestamp(unix_date / 1000) AT TIME ZONE 'UTC';
UPDATE answers SET posted_date = to_timestamp(unix_date / 1000) AT TIME ZONE 'UTC';

CREATE INDEX product_id_index ON questions(product_id);
CREATE INDEX question_id_index ON answers(question_id);
CREATE INDEX answer_id_index ON photos(answer_id);

SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));
SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers));
SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos));
