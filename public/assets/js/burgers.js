$(function () {
    window.onload = function () {
        $.ajax({
            url: "api/burger",
            method: 'GET'
        }).done(function (response) {
            // console.log(response[0].devoured);
            for (var i = 0; i < response.length; i++) {
                console.log(response[i].devoured)
                
                if (response[i].devoured === false) {
                    var burgerLi = $("<li>");
                    burgerLi.addClass("list-group-item");
                    burgerLi.text(response[i].burger_name);
                    var burgerButt = $("<button>");
                    burgerButt.addClass("btn btn-danger eatBurg");
                    burgerButt.attr("data-id", response[i].id);
                    burgerButt.attr("data-eater", true);
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
            $(".eatBurg").on("click", function (event) {
                var id = $(this).data("id");
                var newDevour = $(this).data("eater");

                var newDevourState = {
                    devoured: newDevour
                };
                console.log(newDevourState);
                var currentURL = window.location.origin;
                // Send the PUT request.
                $.ajax(`/api/burgers/${id}`, {
                    type: "PUT",
                    data: newDevourState
                }).then(
                    function () {
                        console.log("changed devour to", newDevour);
                        // Reload the page to get the updated list
                        location.reload();
                    });
            });

        });    
    };

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
