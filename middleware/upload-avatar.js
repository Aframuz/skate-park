/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const multer = require("multer")
// Local modules
const validation = require("./validations")
const errorHandlers = require("./error-handlers")

/*=============================================
=                   CONFIG                    =
=============================================*/
const upload = multer({
   dest: "public/images/avatars",
   limits: { fileSize: 5 * 1024 * 1024 },
   fileFilter: validation.isImage,
}).single("avatar")

/*=============================================
=                MIDDLEWARE                   =
=============================================*/
const uploadAvatar = (req, res, next) => {
   upload(req, res, (err) => {
      if (err) {
         errorHandlers.imageError(err, res)
      } else {
         validation.validateRegisterForm(req, res, next)
      }
   })
}

module.exports = uploadAvatar
