const { validateToken } = require("../services/authentication");
function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookienValue = req.cookies[cookieName];
    if (!tokenCookienValue) {
       return next();
    }
    try {
      const userPayload = validateToken(tokenCookienValue);
      req.user = userPayload;
    } catch(err){
    }
    next();
  };
}
module.exports = { checkForAuthCookie };
