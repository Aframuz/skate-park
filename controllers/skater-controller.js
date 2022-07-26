/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const Skater = require("../models/skater.js")
const filter = require("../utils/filter-api")
/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get
const getSkaters = async (req, res) => {
   try {
      const skaters = await Skater.findAll()
      const skatersByProperties = filter.byProperties(skaters, req.query)
      const skatersByFields = filter.byFields(skatersByProperties, req.query)
      res.status(200).json({ skaters: skatersByFields })
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
   const newSkaterData = res.locals.skater

   if (req.file) {
      newSkaterData.avatar = req.file.filename
   }

   try {
      const skaterAdded = await Skater.insertOne(newSkaterData)
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

const updateSkaterState = async (req, res) => {
   const { id } = req.params
   const { estado } = req.body
   try {
      await Skater.updateState(id, estado)
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
   updateSkaterState,
   deleteSkater,
}
