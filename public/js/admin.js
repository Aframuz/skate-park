/*=============================================
=                    FETCH                    =
=============================================*/
const getSkaters = async () => {
   const response = await fetch("/api/skaters?fields=foto,nombre,anos_experiencia,especialidad,estado")
   const { skaters } = await response.json()
   return skaters
}

const updateSkaterState = async (skater) => {
   await fetch(`/api/skaters/${skater.id}`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         estado: skater.estado,
      }),
   })
}

/*=============================================
=               DOM MANIPULATION              =
=============================================*/
const populateTable = (skaters) => {
   const tableBody = document.querySelector("#skaters-table tbody")
   const tBodyFragment = document.createDocumentFragment()
   const skaterRows = skaters.map((skater, rowIndex) => createTableRow(skater, rowIndex))
   tBodyFragment.append(...skaterRows)
   tableBody.append(tBodyFragment)
}

const createTableRow = (skater, rowIndex) => {
   // headers
   const headers = ["foto", "nombre", "anos_experiencia", "especialidad", "estado"]
   // ID td
   const idTd = document.createElement("td")
   idTd.textContent = rowIndex + 1
   idTd.classList.add("fw-bold")
   // Skater Data tds
   const tr = document.createElement("tr")
   const trFragment = document.createDocumentFragment()
   // const skaterCells = Object.values(skater).map(createTableData)
   const skaterCells = headers.map((header) => createTableData(skater, header))
   trFragment.append(idTd, ...skaterCells)
   tr.append(trFragment)
   return tr
}

const createTableData = (skater, header) => {
   const td = document.createElement("td")
   if (header === "estado") {
      const checkBox = document.createElement("input")
      checkBox.type = "checkbox"
      checkBox.checked = skater.estado
      checkBox.addEventListener("change", (e) => {
         skater.estado = e.target.checked
         updateSkaterState(skater)
      })
      td.append(checkBox)
   } else if (header === "foto") {
      td.innerHTML = `<img src="/images/avatars/${skater.foto}" alt="${skater.nombre} avatar" class="img-fluid">`
   } else {
      td.textContent = skater[header]
   }
   return td
}

/*=============================================
=                     INIT                    =
=============================================*/
;(async () => {
   const skaters = await getSkaters()
   populateTable(skaters)
})()
