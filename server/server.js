require('dotenv').config();
const express = require("express");
const app=express();
app.use(express.json());

const dbConfig= require('./config/dbConfig.js');
const usersRoute= require('./routes/usersRoute.js');
const inventoryRoute= require('./routes/inventoryRoute.js');
const dashboardRoute= require('./routes/dashboardRoute.js');

app.use("/api/users",usersRoute);
app.use("/api/inventory",inventoryRoute);
app.use("/api/dashboard",dashboardRoute);

// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}


const port = process.env.PORT || 5000;

app.listen(port , () => {
    console.log(`Listening on port ${port}`);
});