var path = require("path");
var db = require("../models");

//=======================================

module.exports = function (app) {
    //html get requests
    //below code handles different pathways for each page
    //in each of the below cases the user is shown an html content.
    //home page path function
    app.get("/", function (req, res) {
        res.render("index", {
            title: "title"
        });
    });
}