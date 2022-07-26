/*=============================================
=               IMPORT MODULES               =
=============================================*/
// 3rd party modules
const express = require("express")
const { create } = require("express-handlebars")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv").config()
// Local modules
const mainRoute = require("./routes/main-route")
const skaterRoute = require("./routes/skater-route")
// Core modules
const path = require("path")

/*=============================================
=                  VARIABLES                  =
=============================================*/
const PORT = process.env.PORT || 3000
const app = express()

/*=============================================
=         MIDDLEWARE & APP SETTINGS           =
=============================================*/
app.use(express.static(path.join(__dirname, "public")))
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")))

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const exphbs = create({
   extname: ".hbs",
   helpers: {
      if_eq: function (a, b, opts) {
         if (a == b) {
            return opts.fn(this)
         } else {
            return opts.inverse(this)
         }
      },
   },
})

app.engine("hbs", exphbs.engine)
app.set("view engine", "hbs")

/*=============================================
=                   ROUTES                    =
=============================================*/

app.use("/", mainRoute)
app.use("/api", skaterRoute)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
