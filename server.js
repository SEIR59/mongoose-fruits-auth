/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
// const Fruit = require("./models/fruit");

// we need to require our routers
const FruitRouter = require('./controllers/fruits')

const path = require("path")

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
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({
    extended: true
})); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

// send all '/fruits' routes to the Fruit Router
app.use('/fruits', FruitRouter)

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.");
});



//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT}`);
    routesReport.print()
})