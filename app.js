// jshint esversion:6

const express = require("express");
const bodyPaser = require("body-parser");

const app = express();
app.use(bodyPaser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');
let items = [];
let workItems = [];

app.get("/", function(req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);
  res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res) {
let item = req.body.newItem;
  if (req.body.list === "work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "work List",newListItems: workItems});

});
app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});


app.listen(process.env.PORT || 4000, function() {
  console.log("Server Runing on Port 4000");
});
