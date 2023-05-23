const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.kd5ongc.mongodb.net/todolistDB`
);

let firstStart = true;

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = Item({
  name: "Welcome to your To-Do list!",
});

const item2 = Item({
  name: "Hit the + button to add a new item.",
});

const item3 = Item({
  name: "<-- Hit this to delete the item.",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  Item.find({})
    .then(function (foundItems) {
      if (foundItems.length === 0 && firstStart) {
        Item.insertMany(defaultItems)
          .then(function () {
            console.log("Successfully saved default items to DB.");
          })
          .catch(function (err) {
            console.log(err);
          });

        firstStart = false;

        res.redirect("/");
      } else {
        res.render("list", { listTitle: "Today", newListItems: foundItems });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName })
    .then(function (list) {
      if (!list) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });

        list.save();
        console.log("Lists created successfully");
        res.redirect("/" + customListName);
      } else {
        res.render("list", { listTitle: list.name, newListItems: list.items });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName })
      .then(function (foundList) {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId)
      .then(function () {
        res.redirect("/");
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } }
    )
      .then(function () {
        res.redirect("/" + listName);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
