const tokens = require('./token');

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { token } = req.body;
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
