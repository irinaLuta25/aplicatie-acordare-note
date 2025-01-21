const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models").User;
const axios = require("axios");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ where: { id } });
  done(null, user);
});

passport.use(
    new GoogleStrategy(
      {
        clientID: "23568952834-2hluckol4n2rhf0sqhgv76j8cevank1o.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:4848/api/auth/google/redirect",
      },
      (accessToken, refreshToken, email, done) => {
        const userEmail = email.emails && email.emails[0] && email.emails[0].value;
        if (!userEmail) {
          console.error("Eroare: Nu s-a primit email-ul utilizatorului!");
          return done(new Error("Email-ul nu a fost furnizat de Google"), null);
        }
  
        User.findOne({
          where: { email: userEmail },
        })
          .then((currentUser) => {
            if (!currentUser) {
              // Cream utilizatorul nou
              User.create({
                firstName: email.name.givenName,
                lastName: email.name.familyName,
                email: userEmail,
              })
                .then((user) => {
                  console.log("Utilizator creat:", user);
                  return done(null, user);
                })
                .catch((err) => {
                  console.error("Eroare la crearea utilizatorului:", err);
                  return done(err, null);
                });
            } else {
              console.log("Utilizator gasit:", currentUser);
              return done(null, currentUser);
            }
          })
          .catch((err) => {
            console.error("Eroare la cautarea utilizatorului:", err);
            return done(err, null);
          });
      }
    )
  );
  