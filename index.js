const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// CORS設定
const corsOptions = {
  origin: 'https://yumaarita.github.io',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Accept"
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// プリフライトリクエストを処理
app.options('*', (req, res) => {
  res.status(204).send();
});

// favicon.icoのリクエストを処理
app.get('/favicon.ico', (req, res) => res.status(204).end());

// 直接 /api/verify エンドポイントを処理
app.all('/api/verify', require('./verification-api/api/verify'));

// 直接 /api/generate-token エンドポイントを処理
app.all('/api/generate-token', require('./verification-api/api/generate-token'));

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
