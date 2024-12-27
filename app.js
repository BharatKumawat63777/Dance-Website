const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose
  .connect("mongodb://127.0.0.1:27017/contactDance")
  .then(() => {
    console.log("DB connection Done");
  })
  .catch(() => {
    console.log("Not connected DB");
  });
const port = 8000;

//Define Mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Express specific stuff
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// pug specific stuff
app.set("view engine", "pug"); //the template engine as pug
app.set("views", path.join(__dirname, "views")); //views directory

app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("This item has been saved to the database");
      // alert("This item has been saved to the database")
    })
    .catch(() => {
      // alert("This item has not been saved to the database")
      res.status(400).send("Item was not saved to the database");
    });
  // res.status(200).render('contact.pug');
});

// Start the server
app.listen(port, () => {
  console.log(`The application started sucessfully on port ${port}`);
});
