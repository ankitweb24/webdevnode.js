const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
//require the database file
require('./database/config');
const temp_path = path.join(__dirname, "../views");
const partials_path = path.join(__dirname, "../views/partials");
const userData = require('./model/model');
const collection1 = userData.collection1;
const collection2 = userData.collection2;
app.set("view engine", "hbs");
app.set("views", temp_path);
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);


app.use(express.urlencoded({ extended: false }));

hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/contactData", async (req, res) => {
  try {
    const username = req.body.user;
    const email = req.body.email;
    const message = req.body.message;
    const userFillData = new collection1({
      name: username,
      email: email,
      message: message
    })

    let saveResult = await userFillData.save();
    if (saveResult) {
      res.render('home');
    } else {
      console.log(`data is not inserted`);
    }
  } catch (error) {
    res.status(401).send(error)
  }
  // console.table([username, email, message]);
});

app.post('/registration', async (req, res) => {
  try {
    const username = req.body.user;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if (password === cpassword) {
      const singupData = new collection2({
        name: username,
        email: email,
        phone: phone,
        password: password,
        cpassword: cpassword
      });
      const singupsave = await singupData.save();
      if (singupsave) {
        res.render('home', { username, lnLogged: true });
      }
    } else {
      res.send("password are not match");
    }
  } catch (error) {
    res.status(401).send(error);
  }
})
app.listen(port, () => {
  console.log(`listing to the port at ${port}`);
});
