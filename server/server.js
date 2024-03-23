const express = require('express');
const db = require('../database/db.js');
require('dotenv').config();

const app = express();

app.use(express.json());

// get questions
app.get('/questions', (req, res) => {
  const productId = 40712;
  db.getQuestions(productId)
    .then((result) => {
      console.log('qs received');
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

// post question
app.post('/questions', (req, res) => {
  db.addQuestion(req.body)
    .then(() => {
      console.log('question successfully posted');
      res.sendStatus(200);
    })
    .catch(() => {
      console.log('error adding question');
      res.sendStatus(500);
    });
});

// get answers + photos
app.get('/answers', (req, res) => {
  const questionId = 143325;
  db.getAnswers(questionId)
    .then((result) => {
      console.log('answers received');
      res.send(result);
    });
});

// post answer + photos
app.post('/answers', (req, res) => {
  db.addAnswer(req.body)
    .then(() => {
      console.log('answer posted successfully');
      res.sendStatus(200);
    })
    .catch(() => {
      console.log('error posting answer');
      res.sendStatus(500);
    });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
