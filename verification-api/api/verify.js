const tokens = require('./token');

module.exports = async (req, res) => {
  if (req.method === "POST" || req.method === "GET") {
    const token = req.method === "POST" ? req.body.token : req.query.token;
    try {
      if (tokens[token]) {
        tokens[token].verified = true;
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false, message: "Invalid token" });
      }
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
