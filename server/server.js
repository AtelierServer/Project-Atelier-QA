require('dotenv').config();
const express = require('express');
const qaController = require('./controllers/index.js');

const app = express();
app.use(express.json());

app.all('/questions', qaController);
app.all('/answers', qaController);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
