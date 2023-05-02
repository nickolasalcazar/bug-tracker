const { auth } = require("express-oauth2-jwt-bearer");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Middleware that will return a 401 if a valid JWT bearer token is not
 * provided in the request.
 * @link https://auth0.github.io/node-oauth2-jwt-bearer/functions/auth.html
 */
module.exports = jwtCheck = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
  tokenSigningAlg: "RS256",
});
