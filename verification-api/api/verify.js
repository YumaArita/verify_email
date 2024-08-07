const tokens = require('./token');

module.exports = (req, res) => {
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
