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

// Filter resources by property in query string
const byProperties = (collection, qs) => {
   const filters = getFilters(qs)

   // If no filters, return collection
   if (filters.length === 0) {
      return collection
   }

   return collection.filter((resource) => {
      let isValid = true

      filters.forEach((filter) => {
         if (resource[filter.key] !== filter.value) {
            isValid = false
         }
      })

      return isValid
   })
}

// Get filters from query string
const getFilters = (qs) => {
   const filters = []

   // Exclude page, limit, and sort fields from filters
   for (const key in qs) {
      if (key !== "page" && key !== "limit" && key != "fields" && qs[key] !== "asc" && qs[key] !== "desc") {
         filters.push({
            key,
            value: qs[key],
         })
      }
   }

   return filters
}

module.exports = {
   byFields,
   byProperties,
}
