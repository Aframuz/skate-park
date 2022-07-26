/*=============================================
=                    FETCH                    =
=============================================*/
const updateSkater = async (skater) => {
   console.log(skater.id)
   await fetch(`/api/skaters/${skater.id}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(skater),
   })
}

const getSkaterId = async (email) => {
   const res = await fetch(`/api/skaters?email=${email}`)
   const { skaters } = await res.json()
   return skaters[0].id
}

const deleteSkater = async (id) => {
   await fetch(`/api/skaters/${id}`, {
      method: "DELETE",
   })
}
/*=============================================
=               DOM MANIPULATION              =
=============================================*/
const updateBtn = document.querySelector("#update-btn")
const deleteBtn = document.querySelector("#delete-btn")

const getFormData = () => {
   const form = document.querySelector("#skater-info")
   return Object.values(form).reduce((obj, field) => {
      obj[field.name] = field.value
      return obj
   }, {})
}

updateBtn.addEventListener("click", async () => {
   const data = getFormData()
   console.log(data)
   if (data.password !== data.confirmPassword) {
      alert("Passwords do not match")
      return
   }

   const id = await getSkaterId(data.email)

   const skater = {
      id,
      email: data.email,
      nombre: data.name,
      password: data.password,
      anos_experiencia: data.experience,
      especialidad: data.specialty,
   }

   await updateSkater(skater)
   alert("Skater updated")
   window.location.href = "/"
})

deleteBtn.addEventListener("click", async () => {
   const { email } = getFormData()
   const id = await getSkaterId(email)
   await deleteSkater(id)
   alert("Skater deleted")
   window.location.href = "/"
})
