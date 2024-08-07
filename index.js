const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://yumaarita.github.io',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/api/verify', require('./verify'));
app.use('/api/generate-token', require('./generate-token'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
