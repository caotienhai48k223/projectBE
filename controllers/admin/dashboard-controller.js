module.exports.dashboard = (req, res)=> {
  res.render('admin/pages/dashboard/dashboard', {
    pageTitle: "Dashboard"
  })
}