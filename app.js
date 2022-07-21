/*=============================================
=               IMPORT MODULES               =
=============================================*/
// 3rd party modules
const express = require("express")
const exphbs = require("express-handlebars")
// Local modules
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

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine("hbs", exphbs.engine({ extname: "hbs" }))
app.set("view engine", "hbs")

/*=============================================
=                   ROUTES                    =
=============================================*/

app.get("/", (req, res) => {
   res.render("home")
})

app.use("/skaters", skaterRoute)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
