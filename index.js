const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("express-flash")
require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index-route");
const route = require("./routes/client/index-route");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", "./views");
app.set("view engine", "pug");

//Flash 
app.use(cookieParser('haitank4'))
app.use(session({ cookie: { maxAge: 60000 } }))
app.use(flash())
//End Flash

// App Local Variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));

//Routes
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Truy cập http://localhost:${port}`);
});
