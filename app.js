const express                = require("express"),
      app                    = express(),
      path                   = require("path"),
      bodyParser             = require("body-parser"),
      authorizationRoutes    = require(path.join(__dirname, "/routes/authorization.js"))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {res.redirect("login")})

// ======================== Render Login Page ======================== 
app.use("/", authorizationRoutes)

// ======================== Get Undefined Routes ======================== 
app.get("*", (req, res) => {res.render(path.join(__dirname, "/views/404"))})

app.listen(80, () => {console.log("================================ server started on: http://localhost:80 ================================ ");})

