/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
/*=============================================
=                  HANDLERS                   =
=============================================*/
const renderHome = (req, res) => {
   res.render("home")
}

const renderPage = (req, res) => {
   const page = req.params.page

   res.render(page, { title: page }, (err, html) => {
      if (err)
         res.render("404", {
            title: "Not Found",
         })
      else res.send(html)
   })
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   renderHome,
   renderPage,
}
