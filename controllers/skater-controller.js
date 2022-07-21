/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const Skater = require("../models/skater.js")
/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get
const getSkaters = async (req, res) => {
   try {
      const skaters = await Skater.findAll()
      res.status(200).json({ skaters })
   } catch (err) {
      res.status(500).json({
         error: {
            statusCode: 500,
            errorCode: "INTERNAL_SERVER_ERROR",
            message: "Internal server error",
            devMessage: `${err.message} with code ${err.code}`,
            timestamp: new Date().toISOString(),
         },
      })
   }
}

// Inserting
const addSkater = async (req, res) => {
   const skaterToAdd = req.body
   try {
      const skaterAdded = await Skater.insertOne(skaterToAdd)
      res.status(201).json({ skaterAdded })
   } catch (err) {
      res.status(500).json({
         error: {
            statusCode: 500,
            errorCode: "INTERNAL_SERVER_ERROR",
            message: "Internal server error",
            devMessage: `${err.message} with code ${err.code}`,
            timestamp: new Date().toISOString(),
         },
      })
   }
}

// Updating
const updateSkater = async (req, res) => {
   const { id } = req.params
   const skaterToUpdate = req.body
   try {
      await Skater.updateOne(Object.assign({ id }, skaterToUpdate))
      res.status(204).end()
   } catch (err) {
      res.status(500).json({
         error: {
            statusCode: 500,
            errorCode: "INTERNAL_SERVER_ERROR",
            message: "Internal server error",
            devMessage: `${err.message} with code ${err.code}`,
            timestamp: new Date().toISOString(),
         },
      })
   }
}

// Deleting
const deleteSkater = async (req, res) => {
   const { id } = req.params
   try {
      await Skater.deleteOne(id)
      res.status(204).end()
   } catch (err) {
      res.status(500).json({
         error: {
            statusCode: 500,
            errorCode: "INTERNAL_SERVER_ERROR",
            message: "Internal server error",
            devMessage: `${err.message} with code ${err.code}`,
            timestamp: new Date().toISOString(),
         },
      })
   }
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getSkaters,
   addSkater,
   updateSkater,
   deleteSkater,
}
