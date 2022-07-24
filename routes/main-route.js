/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const express = require("express")
// Local modules
const mainCtrl = require("../controllers/main-controller")

/*=============================================
=                    INIT                     =
=============================================*/

const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.route("/").get(mainCtrl.renderHome)
router.route("/:page").get(mainCtrl.renderPage)

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = router
