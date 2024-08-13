const express = require("express")
const route = require("./routes/client/index-route")
const app = express()
const port = 8000

app.set('views', './views');
app.set('view engine', 'pug');

route(app)

app.listen(port, () => {
  console.log(`Truy cập http://localhost:${port}`) 
})