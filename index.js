const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const connection = process.env.DB_CONNECTION;

mongoose.connect(connection, {
  useNewUrlParser: true,
});

const NameModel = require('./model');

app.get('/names', (req, res) => {
  NameModel.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.post('/newName', async (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: 'No data received' });
  }
  try {
    const name = await NameModel.create(req.body);
    res.status(200).json(name);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;

const listener = app.listen(PORT, () => {
  console.log(`Server running on port ${listener.address().port}`);
});
