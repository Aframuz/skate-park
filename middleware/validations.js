const isImage = (req, file, cb) => {
   if (!file.mimetype.startsWith("image")) {
      cb(new Error("Not an image!"))
   } else cb(null, true)
}

const validateRegisterForm = (req, res, next) => {
   const { name, email, password, confirmPassword } = req.body

   const errors = []

   if (!name || name.length < 3) errors.push("El nombre debe ser a los menos de 3 caracteres")
   if (!email || !email.includes("@")) errors.push("Ingrese un email válido")
   if (!password || password.length < 8) errors.push("Contraseña debe ser a los menos de 8 caracteres")
   if (!confirmPassword || confirmPassword !== password) errors.push("Contraseñas no coinciden")

   if (errors.length > 0) {
      res.render("register", {
         title: "Register",
         errors,
      })
   } else {
      res.locals.skater = {
         email,
         name,
         password,
         experience: req.body.experience,
         specialty: req.body.specialty,
         avatar: "default-avatar",
         state: false,
      }
      next()
   }
}

module.exports = {
   isImage,
   validateRegisterForm,
}
