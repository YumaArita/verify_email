const express = require('express');
const cors = require('cors');

const app = express();

// CORS設定
const corsOptions = {
  origin: 'https://yumaarita.github.io',
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  next();
});

app.options('/api/verify', cors(corsOptions));
app.options('/api/generate-token', cors(corsOptions));

app.use('/api/verify', require('./verify'));
app.use('/api/generate-token', require('./generate-token'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
