/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require("express"); // import express
const path = require("path")
const middleware = require("./utils/middleware");
const FruitRouter = require("./controllers/fruits");
const UserRouter = require("./controllers/user");

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {
    root: [path.resolve(__dirname, 'views/')]
})

const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
middleware(app);

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

// send all '/fruits' routes to the Fruit Router
app.use('/fruits', FruitRouter) // send all "/fruits" routes to fruit router
app.use("/user", UserRouter); // send all "/user" routes to user router

app.get("/", (req, res) => {
    // res.send("your server is running... better catch it.");
    res.render("index.liquid");
});


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT}`);
    routesReport.print()
})