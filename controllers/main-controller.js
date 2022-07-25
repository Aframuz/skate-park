/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const multer = require("multer")
// Local modules
const Skater = require("../models/skater")

/*=============================================
=                  HANDLERS                   =
=============================================*/
const renderHome = (req, res) => {
   res.render("home")
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

const addSkater = async (req, res) => {
   const newSkaterData = res.locals.skater

   if (req.file) {
      newSkaterData.avatar = req.file.filename
   }

   try {
      const newSkater = await Skater.insertOne(newSkaterData)
      console.log(`New skater created: ${newSkater.nombre}`)
      res.status(201).render("home", {
         title: "Home",
         newSkater,
      })
   } catch (err) {
      console.log(err)
      res.status(400).render("register", {
         title: "Register",
         errors: err.errors,
      })
   }
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   renderHome,
   renderPage,
   addSkater,
}
