const express = require('express');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

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

app.get('/favicon.ico', (req, res) => res.status(204));

// プロキシ設定
app.use('/api', createProxyMiddleware({
  target: 'https://verify-email-4bengvvmh-yuma-fukudas-projects.vercel.app', // VercelにデプロイしたバックエンドAPIのURL
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // /apiから始まるパスをバックエンドAPIのルートにマッピングします
  },
}));

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
