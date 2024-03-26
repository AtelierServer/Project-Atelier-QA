const { Pool, Client } = require('pg');

require('dotenv').config();

module.exports.getQuestions = (productId) => {
  console.log('in db.js getting questions');
  const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PGPORT,
    max: 20,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 2000,
  });
  const getQuestionQuery = `SELECT * FROM questions WHERE product_id = '${productId}' AND reported = 0;`;
  return pool.connect()
    .then(() => pool.query(getQuestionQuery))
    .then((result) => {
      console.log('question query successful');
      return result.rows;
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      throw error;
    });
};

module.exports.getAnswers = (questionId) => {
  console.log('in db.js getting answers');
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  const getAnswerQuery = `SELECT * FROM answers WHERE question_id = '${questionId}' AND reported = 0;`;
  return client.connect()
    .then(() => client.query(getAnswerQuery))
    .then((result) => {
      console.log('answers query successful');
      return result.rows;
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      throw error;
    })
    .finally(() => {
      client.end();
    });
};

module.exports.addQuestion = (questionToAdd) => {
  console.log('in db.js POSTING question');
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  const reported = 0;
  const helpfulness = 0;
  const addQuestionQuery = `INSERT INTO questions (id, product_id, question_body, asker_name, asker_email, reported, question_helpfulness) VALUES (DEFAULT, '${questionToAdd.product_id}', '${questionToAdd.body}', '${questionToAdd.name}', '${questionToAdd.email}', '${reported}', '${helpfulness}');`;
  return client.connect()
    .then(() => client.query(addQuestionQuery))
    .then((result) => {
      console.log('successfully added question');
      return result.rows;
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      throw error;
    })
    .finally(() => {
      client.end();
    });
};

module.exports.addAnswer = (answerToAdd) => {
  console.log('in db.js POSTING answer');
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  const reported = 0;
  const helpfulness = 0;
  const addAnswerQuery = `INSERT INTO answers (question_id, body, answerer_name, answerer_email, reported, helpfulness) VALUES ('${answerToAdd.question_id}', '${answerToAdd.body}', '${answerToAdd.name}', '${answerToAdd.email}', '${reported}', '${helpfulness}');`;
  return client.connect()
    .then(() => client.query(addAnswerQuery))
    .then((result) => {
      console.log('successfully added answer');
      return result.rows;
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      throw error;
    })
    .finally(() => {
      client.end();
    });
};
