const express = require('express');
const cors = require('cors');
const path = require('path');

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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // 追加
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
