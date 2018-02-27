$(function () {
    window.onload = function () {
        $.ajax({
            url: "api/burger",
            method: 'GET'
        }).done(function (response) {
            console.log(response[0].devoured);
            for (var i = 0; i < response.length; i++) {
                if (response[i].devoured = true) {
                    var burgerLi = $("<li>");
                    burgerLi.addClass("list-group-item");
                    burgerLi.text(response[i].burger_name);
                    var burgerButt = $("<button>");
                    burgerButt.addClass("change-devour btn btn-danger minerBtn");
                    burgerButt.attr("data-id", response[i].id);
                    burgerButt.css({ "background-color": "black", "shadow": "white" });
                    burgerButt.text("Eat Me!");
                    // burgerLi.html(burgerButt);
                    $(".notDevoured").append(burgerLi);
                    $(".notDevoured").append(burgerButt);
                } else {
                    var burgerLi = $("<li>");
                    burgerLi.addClass("list-group-item");
                    burgerLi.text(response[i].burger_name);
                    $(".Devoured").append(burgerLi);
                }
            };
        });    
    };
    $(".change-devour").on("click", function (event) {
        var id = $(this).data("id");
        var newDevour = $(this).data("newdevour");

        var newDevourState = {
            devoured: newDevour
        };

        var currentURL = window.location.origin;
        // Send the PUT request.
        $.ajax(`${currentURL}/api/burgers/${id}`, {
            type: "PUT",
            data: newDevourState
        }).then(
            function () {
                console.log("changed devour to", newDevour);
                // Reload the page to get the updated list
                location.reload();
            }
            );
    });

    $("#createburger").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var newBurger = {
            burger_name: $("#newname").val().trim(),
            devoured: false
        };
        console.log(newBurger);
        var currentURL = window.location.origin;
        // Send the POST request.
        $.ajax({
            url: `api/burger`,
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            });
    });
});
