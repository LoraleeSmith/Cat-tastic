$(document).ready(function () {

    var cat = [
        "kitty", "cat", "kitten", "cats"
    ];

    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }

    }

    $(document).on("click", ".cat-button", function () {
        $("#cat").empty();
        $(".cat-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var catDiv = $("<div class=\"cat-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var catImage = $("<img>");
                    catImage.attr("src", still);
                    catImage.attr("data-still", still);
                    catImage.attr("data-animate", animated);
                    catImage.attr("data-state", "still");
                    catImage.addClass("cat-image");

                    catDiv.append(p);
                    catDiv.append(catImage);

                    $("#cat").append(catDiv);
                }
            });
    });

    $(document).on("click", ".cat-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var newGif = $("input").eq(0).val();

        if (newGif.length > 2) {
            gif.push(newGif);
        }

        populateButtons(cat, "cat-button", "#cat-buttons");

    });

    populateButtons(cat, "cat-button", "#cat-buttons");
});
