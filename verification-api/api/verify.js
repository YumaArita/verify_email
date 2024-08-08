const crypto = require('crypto');
const { enc } = require('crypto-js');
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (token) => {
  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined");
  }

  const [base64data, receivedSignature] = token.split(".");
  if (!base64data || !receivedSignature) {
    return null;
  }

  const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(base64data).digest('hex');
  if (expectedSignature !== receivedSignature) {
    return null;
  }

  const decodedData = JSON.parse(Buffer.from(base64data, 'base64').toString('utf-8'));

  if (decodedData.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return decodedData.email;
};

module.exports = async (req, res) => {
  if (req.method === "POST" || req.method === "GET") {
    const token = req.method === "POST" ? req.body.token : req.query.token;
    try {
      const email = verifyToken(token);
      if (email) {
        res.status(200).json({ success: true, email });
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
