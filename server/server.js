require('dotenv').config();
const express = require('express');
// const apicache = require('apicache');
const path = require('path');
const qaController = require('./controllers/index.js');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));
// let cache = apicache.middleware;
// app.use(cache('30 seconds'));

const port = process.env.PORT || 3000;

app.get('/qa/questions/:product_id', qaController);
app.get('/qa/questions/:question_id/answers', qaController);

app.post('/qa/questions', qaController);
app.post('/qa/questions/:question_id/answers');

app.put('/qa/questions/:question_id/helpful', qaController);
app.put('/qa/questions/:question_id/report', qaController);
app.put('/qa/answers/:answer_id/helpful', qaController);
app.put('/qa/answers/:answer_id/report', qaController);

app.listen(port, () => {
  console.log('listening on port 3000');
});
