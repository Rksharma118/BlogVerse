const JWT = require("jsonwebtoken");
const secret = "Rksharma_theGreat@167";

async function createTokenForUser(user) {
  const payload = await {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = { createTokenForUser, validateToken };
