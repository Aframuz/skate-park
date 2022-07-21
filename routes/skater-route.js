/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const express = require("express")
// Local modules
const skaterCtrl = require("../controllers/skater-controller")

/*=============================================
=                    INIT                     =
=============================================*/

const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.route("/").get(skaterCtrl.getSkaters).post(skaterCtrl.addSkater)
router.route("/:id").put(skaterCtrl.updateSkater).delete(skaterCtrl.deleteSkater)

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = router
