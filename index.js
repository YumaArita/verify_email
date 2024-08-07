const express = require('express');
const cors = require('cors');

const app = express();

// CORS設定
const corsOptions = {
  origin: 'https://yumaarita.github.io',
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

// プリフライトリクエストを処理
app.options('*', cors(corsOptions));

app.use('/api/verify', require('./verification-api/api/verify'));
app.use('/api/generate-token', require('./verification-api/api/generate-token'));

app.get('/', (req, res) => {
  res.send('Verification API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
