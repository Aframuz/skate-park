/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const express = require("express")
// Local modules
const mainCtrl = require("../controllers/main-controller")
const uploadAvatar = require("../middleware/upload-avatar")

/*=============================================
=                    INIT                     =
=============================================*/

const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.route("/").get(mainCtrl.renderHome)
router.route("/:page").get(mainCtrl.renderPage)
router.post("/register", uploadAvatar, mainCtrl.registerSkater)
/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = router
