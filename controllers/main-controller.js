/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const Skater = require("../models/skater.js")

/*=============================================
=                  HANDLERS                   =
=============================================*/
const renderHome = (req, res) => {
   const newSkaterName = req.cookies.skater
   res.clearCookie("skater", { httpOnly: true })
   res.render("home", {
      title: "Home",
      newSkaterName,
   })
}

const renderProfile = (req, res) => {
   const { skater } = req.body
   res.render("profile", {
      title: "Profile",
      skater,
   })
}

const renderAdmin = (req, res) => {
   res.render("admin", {
      title: "Admin",
   })
}

const renderLogin = (req, res) => {
   res.render("login", {
      title: "Login",
   })
}

const renderRegister = (req, res) => {
   res.render("register", {
      title: "Register",
   })
}

const registerSkater = async (req, res) => {
   const newSkaterData = res.locals.skater
   if (req.file) {
      newSkaterData.avatar = req.file.filename
   }

   try {
      const skaterAdded = await Skater.insertOne(newSkaterData)
      res.cookie("skater", skaterAdded.nombre, { httpOnly: true })
      res.status(201).redirect("/")
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
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   renderHome,
   renderProfile,
   renderAdmin,
   renderLogin,
   renderRegister,
   registerSkater,
}
