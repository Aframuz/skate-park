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

const renderPage = (req, res) => {
   const page = req.params.page

   res.render(page, { title: page }, (err, html) => {
      if (err)
         res.render("404", {
            title: "Not Found",
         })
      else res.send(html)
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
   renderPage,
   registerSkater,
}
