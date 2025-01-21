const express = require("express");
const passport = require("passport");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.cookie("user", {}, { maxAge: -1 });
//   res.redirect(CLIENT_HOME_PAGE_URL);
// });
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("Eroare la deconectare:", err);
      return next(err);
    }
    // Șterge cookie-ul și redirecționează utilizatorul
    res.cookie("user", {}, { maxAge: -1 });
    res.redirect(CLIENT_HOME_PAGE_URL);
  });
});


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {failureRedirect: "/failure", successRedirect: "/api/auth/success"}));
  // (req, res) => {
  //    const user = req.user;

  //   const expires = new Date(Date.now() + 900000) 
  //   res.cookie('user', JSON.stringify(user), { expires });
  //   res.redirect(CLIENT_HOME_PAGE_URL);
  // }

router.get("/success", async (req, res) => {
    const user = req.user;
    const expires = new Date(Date.now() + 900000) 
    res.cookie('user', JSON.stringify(user), { expires });
    if(user.role==1) {
      res.redirect(302, "http://localhost:3000/student")
    }else{
      res.redirect(302, "http://localhost:3000/teacherMyAssignments")
    }
    
})

module.exports = router;