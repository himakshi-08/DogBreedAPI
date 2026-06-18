const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const tokenExtractor = (req) => {
  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return authHeader || null;
};
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([tokenExtractor]),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => done(null, payload)
  )
);
module.exports = passport;