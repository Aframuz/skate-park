/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const express = require("express")
const multer = require("multer")
// Local modules
const mainCtrl = require("../controllers/main-controller")
const validation = require("../middleware/validate-form")

/*=============================================
=                    INIT                     =
=============================================*/
const upload = multer({
   dest: "public/images/avatars",
   limits: { fileSize: 5 * 1024 * 1024 },
   fileFilter: validation.isImage,
})
const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.route("/").get(mainCtrl.renderHome)
router.route("/:page").get(mainCtrl.renderPage)
router.post("/register", upload.single("avatar"), validation.validateRegisterForm, mainCtrl.addSkater)

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = router
