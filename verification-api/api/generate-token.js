const tokens = require('./tokens');

module.exports = (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });

  if (req.method === "POST") {
    const { email, token } = req.body;
    tokens[token] = { email, verified: false };
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
