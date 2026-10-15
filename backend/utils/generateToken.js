const jwt = require('jsonwebtoken');

const generateToken = (res, customerId) => {
  const token = jwt.sign({ customerId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  const isCrossSiteProduction = Boolean(process.env.NODE_ENV === 'production' || process.env.RENDER || process.env.VERCEL);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: isCrossSiteProduction,
    sameSite: isCrossSiteProduction ? 'none' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

module.exports = generateToken;
