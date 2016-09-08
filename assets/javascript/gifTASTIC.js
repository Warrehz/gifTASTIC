var topics = ["darth vader", "blade runner", "cowboy bebop", "sauron"];

for (var i = 0; i < topics.length; i++) {

  var newDiv = $("<div>");

  var newButton = $("<button>");

  newButton.attr("data-topic", topics[i]);

  newButton.attr("class", "button");

  newButton.html(topics[i]);

  newDiv.attr("class", "buttonHolder");

  newDiv.append(newButton);

  $(".button-area").append(newDiv);

}

$(".button").on("click", function() {

  var q = $(this).data("topic");

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + q + "&limit=10&api_key=dc6zaTOxFJmzC";

  $.ajax({url: queryURL, method: "GET"})
    .done(function(response) {

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var rating = results[i].rating;

        var gifDiv = $("<div class='stillImage'>");

        var gifRating = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img>");

        gifImage.attr("src", results[i].images.fixed_height_still.url);

        gifDiv.append(gifImage);

        gifDiv.append(gifRating);

        $(".gif-area").prepend(gifDiv);

      }

    });


});
