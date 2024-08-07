const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://yumaarita.github.io',
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'X-Requested-With'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/verification-spi/api/verify', require('./verify'));
app.use('/verification-spi/api/generate-token', require('./generate-token'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
