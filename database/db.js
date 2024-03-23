const { Client } = require('pg');

require('dotenv').config();

module.exports.getQuestions = (productId) => {
  console.log('in db.js');
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  return client.connect()
    .then(() => {
      return client.query(`SELECT * FROM questions WHERE product_id = '${productId}'`)
    })
    .then((result) => {
      console.log('question query successful');
      return result.rows;
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      throw error;
    })
    .finally(() => {
      client.end();
    })
}

module.exports.getAnswers = (questionId) => {
  console.log('in db.js getting answers');
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  return client.connect()
    .then(() => {
      return client.query(`SELECT * FROM answers WHERE question_id = '${questionId}'`)
    })
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
    })
}

module.exports.addQuestion = (newQuestion) => {
  console.log('in db.js POSTING answers');
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  return client.connect()
    .then(() => {
      return client.query(`INSERT INTO questions (product_id, question_body, asker_name, asker_email, reported, question_helpfulness) VALUES ('${newQuestion.product_id}', '${newQuestion.question_body}', '${newQuestion.asker_name}', '${newQuestion.asker_email}', '${newQuestion.reported}', '${newQuestion.question_helpfulness}')`)
    })
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
    })
}