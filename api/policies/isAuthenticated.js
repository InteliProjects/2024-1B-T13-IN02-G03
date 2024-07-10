const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = await User.findOne({ id: decoded.id });

    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }

    return proceed();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
