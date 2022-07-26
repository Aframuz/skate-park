/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const express = require("express")
// Local modules
const mainCtrl = require("../controllers/main-controller")
const authCtrl = require("../controllers/auth-controller")
const uploadAvatar = require("../middleware/upload-avatar")

/*=============================================
=                    INIT                     =
=============================================*/

const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.route("/").get(mainCtrl.renderHome)
router.route("/admin").get(authCtrl.authToken, mainCtrl.renderAdmin)
router.route("/profile").get(authCtrl.authToken, mainCtrl.renderProfile)
router.route("/login").get(mainCtrl.renderLogin).post(authCtrl.login)
router.route("/register").get(mainCtrl.renderRegister).post(uploadAvatar, mainCtrl.registerSkater)

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = router
