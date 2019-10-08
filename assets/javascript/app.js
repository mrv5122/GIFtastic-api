// cars objects
$(document).ready(function () {

    var topicsArray = ["Toyota", "Honda", "Volkswagen", "Mazda", "Mercedes-Benz", "Fiat", "Alfa Romeo", "Subaru", "Volvo", "Maserati", "Ferrari", "Lamborghini", "Jeep", "Nissan", "Scion", "Ford", "Cadillac", "GMC", "Buick"]

    function displayButtons() {

        for (var i = 0; i < topicsArray.length; i++) {

            //generate existing buttons
            var car = $("<button>");

            car.addClass("Brand");
            car.attr("data-name", topicsArray[i]);
            car.text(topicsArray[i]);
            $("#buttons-display").append(car);
        }
    }

    //call function to display buttons
    displayButtons();
});


    //button on-click function to fetch data from giphy
    $(document).on("click", "Brand", function () {

        //var to store text information from each button
        var carBrand = $(this).html();
        console.log(carBrand);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + carBrand + "&api_key=yFBJSQI0Jr7bLJof1pMKSlDvt9updifU&limit=10";
        console.log(queryURL);


        //ajax call for the car being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function (response) {
            console.log(queryURL);
            console.log(response);

            var results = response.data;

            // $("#gifs-display").empty();

            for (var i = 0; i < results.length; i++) {

                //create car div to display results with ratings
                var carDiv = $("<div>");
               
                var carView = results[i].images.fixed_height.url;
                var carStill = results[i].images.fixed_still.url;
                
                
               
                //create image tag to hold result image
                var carGif = $("<img>");
                //set src attr of car image to property value from result item
                carGif.attr("src", carStill).attr("data-animate", carView).attr("data-still", carStill);
                carGif.attr("data-state", "still")
                

                //paragraph tag with result's rating
                var rating = results[i].rating;
                var ratingPar = $("<p>").text("Rating: " + rating);
                console.log(rating);

                //append paragraph and img tag to carDiv
                carDiv.append(ratingPar);
                carDiv.append(carGif);

                //prepend animalDiv to html in #gifs-display div
                $("#gifs-display").prepend(carDiv);
                
            }
        });

    });

    //     // start/pause gif function
    //     $(".gif").on("click", function () {

    //         var state = $(this).attr("data-state");

    //         if (state === "still") {
    //             $(this).attr("src", $(this).attr("data-animate"));
    //             $(this).attr("data-state", "animate");
    //         } else {
    //             $(this).attr("src", $(this).attr("data-still"));
    //             $(this).attr("data-state", "still");
    //         }
    //     }; //end pause/play function
    // });