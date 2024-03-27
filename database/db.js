const { Pool, Client } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PGPORT,
  max: 10,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 20000,
});

module.exports.getQuestions = (productId) => {
  console.log('in db.js pool getting questions');
  const getQuestionQuery = `SELECT * FROM questions WHERE product_id = '${productId}' AND reported = 0;`;
  return pool.query(getQuestionQuery)
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
  console.log('in db.js pool getting answers');
  const getAnswerQuery = `SELECT * FROM answers WHERE question_id = '${questionId}' AND reported = 0;`;
  return pool.query(getAnswerQuery)
    .then((result) => {
      console.log('answers query successful');
      return result.rows;
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      throw error;
    })
};

module.exports.addQuestion = (questionToAdd) => {
  console.log('in db.js pool POSTING question');
  const reported = 0;
  const helpfulness = 0;
  const addQuestionQuery = `INSERT INTO questions (id, product_id, question_body, asker_name, asker_email, reported, question_helpfulness) VALUES (DEFAULT, '${questionToAdd.product_id}', '${questionToAdd.body}', '${questionToAdd.name}', '${questionToAdd.email}', '${reported}', '${helpfulness}');`;
  return pool.query(addQuestionQuery)
    .then((result) => {
      console.log('successfully added question');
      return result.rows;
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      throw error;
    })
};

module.exports.addAnswer = (answerToAdd) => {
  console.log('in db.js pool POSTING answer');
  const reported = 0;
  const helpfulness = 0;
  const addAnswerQuery = `INSERT INTO answers (question_id, body, answerer_name, answerer_email, reported, helpfulness) VALUES ('${answerToAdd.question_id}', '${answerToAdd.body}', '${answerToAdd.name}', '${answerToAdd.email}', '${reported}', '${helpfulness}');`;
  return pool.query(addAnswerQuery)
    .then((result) => {
      console.log('successfully added answer');
      return result.rows;
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      throw error;
    })
};
