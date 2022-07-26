/*=============================================
=               IMPORT MODULES                =
=============================================*/
// Local modules
const client = require("../config/db.config")

/*=============================================
=                   QUERIES                   =
=============================================*/
// Get
const findAll = async () => {
   const res = await client.query(`SELECT id, email, nombre, anos_experiencia, especialidad, foto, estado FROM skaters`)
   return res.rows
}

// Get One
const findOne = async (email) => {
   const queryConf = {
      text: "SELECT * FROM skaters WHERE email = $1",
      values: [email],
   }

   const res = await client.query(queryConf)
   return res.rows[0]
}

// Insert
const insertOne = async (skaterObj) => {
   const queryConf = {
      text: "INSERT INTO skaters (id, email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES (default, $1, $2, $3, $4, $5, $6, $7) RETURNING *",
      values: Object.values(skaterObj),
   }
   const res = await client.query(queryConf)
   return res.rows[0]
}

// Update
const updateOne = async (skaterObj) => {
   const queryConf = {
      text: "UPDATE skaters SET email = $2, nombre = $3, password = $4, anos_experiencia = $5, especialidad = $6 WHERE id = $1",
      values: Object.values(skaterObj),
   }

   await client.query(queryConf)
}

const updateState = async (id, estado) => {
   const queryConf = {
      text: "UPDATE skaters SET estado = $2 WHERE id = $1",
      values: [id, estado],
   }

   await client.query(queryConf)
}

// Delete
const deleteOne = async (id) => {
   const queryConf = {
      text: "DELETE FROM skaters WHERE id = $1",
      values: [id],
   }

   await client.query(queryConf)
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   findAll,
   findOne,
   insertOne,
   updateOne,
   updateState,
   deleteOne,
}
