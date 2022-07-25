const imageError = (err) => {
   if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
         res.status(400).send("File too big!")
      } else {
         res.status(400).send("Not an image!")
      }
   }
}

module.exports = {
   imageError,
}
