const tokens = require('./tokens');

module.exports = (req, res) => {
  res.set({
  'Access-Control-Allow-Origin': 'https://yumaarita.github.io',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'X-Requested-With, content-type',
  'Access-Control-Allow-Credentials': 'true'
  });

  if (req.method === "POST") {
    const { email, token } = req.body;
    tokens[token] = { email, verified: false };
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
