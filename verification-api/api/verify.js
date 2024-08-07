const tokens = require('./token');

module.exports = (req, res) => {
  res.set({
  'Access-Control-Allow-Origin': 'https://yumaarita.github.io',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'X-Requested-With, content-type',
  'Access-Control-Allow-Credentials': 'true'
  });

  if (req.method === "POST") {
    const { token } = req.body;
    if (tokens[token]) {
      tokens[token].verified = true;
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Invalid token" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
