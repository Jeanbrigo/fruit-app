////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Fruit = require("../models/fruit");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/user/login");
    }
  });

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// index route
router.get("/", (req, res) => {
    Fruit.find({username: req.session.username}, (err, fruits) => {
      res.render("fruits/index.ejs", { fruits });
    });
  });

//new route
router.get("/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// create route
router.post("/", (req, res) => {
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // add username to req.body to track related user
    req.body.username = req.session.username
    // create the new fruit
    Fruit.create(req.body, (err, fruit) => {
      // redirect the user back to the main fruits page after fruit created
      res.redirect("/fruits");
    });
  });

// edit route
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Fruit.findById(id, (err, fruit) => {
    // render template and send it fruit
    res.render("fruits/edit.ejs", { fruit });
  });
});

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // update the fruit
  Fruit.findByIdAndUpdate(id, req.body, { new: true }, (err, fruit) => {
    // redirect user back to main page when fruit
    res.redirect("/fruits");
  });
});

router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Fruit.findByIdAndRemove(id, (err, fruit) => {
    // redirect user back to index page
    res.redirect("/fruits");
  });
});

// show route
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular fruit from the database
  Fruit.findById(id, (err, fruit) => {
    // render the template with the data from the database
    res.render("fruits/show.ejs", { fruit });
  });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;