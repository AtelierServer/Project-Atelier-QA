const express = require('express');

const router = express.Router();
const db = require('../../database/db.js');

router.get('/qa/questions/:product_id', (req, res) => {
  db.getQuestions(req.params.product_id)
    .then((result) => {
      console.log('qs received');
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get('/qa/questions/:question_id/answers', (req, res) => {
  db.getAnswers(req.params.question_id)
    .then((result) => {
      console.log('answers received');
      res.send(result);
    });
});

router.post('/qa/questions', (req, res) => {
  console.log(req.body);
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

router.post('/qa/answers', (req, res) => {
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

module.exports = router;
