module.exports.home = (req, res)=> {
  res.render('client/pages/home/home', {
    pageTitle: "Trang Chủ"
  })
}