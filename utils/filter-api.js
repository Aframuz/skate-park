// Filter properties to show by fields in query string
const byFields = (collection, qs) => {
   const schemaResource = Object.keys(collection[0])
   const fields = getFields(schemaResource, qs)
   const filtered = []

   // If field is invalid, throw error
   for (const value of fields) {
      if (!schemaResource.includes(value)) {
         throw new Error(`Property ${value} not found`)
      }
   }

   // Add properties to filtered object
   for (const [k, v] of Object.entries(collection)) {
      const skater = {}
      for (const field of fields) {
         skater[field] = v[field]
      }
      filtered.push(skater)
   }

   return filtered
}

// Get fields to add from query string
const getFields = (resourceProperties, qs) => {
   if (qs.fields) {
      return Array.from(new Set(["id", ...qs.fields.split(",")]))
   }
   return resourceProperties
}

module.exports = {
   byFields,
}
