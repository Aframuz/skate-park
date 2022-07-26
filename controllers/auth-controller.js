/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
// Local modules
const Skater = require("../models/skater.js")

/*=============================================
=                  HANDLERS                   =
=============================================*/
const login = async (req, res) => {
   const { email, password } = req.body
   const skater = await Skater.findOne(email)

   if (skater && password === skater.password) {
      const token = jwt.sign({ skater }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
      res.cookie("accessToken", token, { httpOnly: true })
      if (skater.email === "admin@admin.com") {
         res.redirect("/admin")
      } else {
         res.redirect("/profile")
      }
   } else {
      res.render("login", {
         title: "Login",
         errors: ["Invalid email or password"],
      })
   }
}

const authToken = (req, res, next) => {
   const accessToken = req.cookies.accessToken
   if (accessToken == null) return res.sendStatus(401)

   jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, obj) => {
      if (err) return res.sendStatus(403)
      req.body = obj
      next()
   })
}

// Using bcryptjs to hash the password, not used since DB is not encrypted
const generatePassword = async (req, res, next) => {
   const { password } = res.locals.skater

   try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      res.locals.skater.password = hash
   } catch (err) {
      res.status(500).json({
         error: {
            statusCode: 500,
            errorCode: "INTERNAL_SERVER_ERROR",
            message: "Internal server error",
            devMessage: `${err.message} with code ${err.code}`,
            timestamp: new Date().toISOString(),
         },
      })
   }
   next()
}

module.exports = {
   authToken,
   generatePassword,
   login,
}
