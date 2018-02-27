var db = require("../models");

module.exports = function (app) {
    app.get("/api/burger", function (req, res) {
        db.burgers.findAll({}).then(function (response) {
            // console.log(response[0].dataValues);
            var burgArr = [];
            for (var i = 0; i < response.length; i++) {
                burgArr.push(response[i].dataValues);
            };
            res.json(burgArr);
        });
    });    

    app.post("/api/burger", function (req, res) {
        console.log(req.body);
        burger = req.body
        db.burgers.create(burger).then(function (burg) {
            res.json(burg);
        });
    });

    app.put("/api/burgers/:id", function (req, res) {
        console.log(req.body.devoured);

        db.burgers.update({
            devoured: req.body.devoured
        }, {
            where: {
            id: req.params.id
            }
        }).then(function (dbBurg) {
                res.json(dbBurg);
        });
    });
};  