var characters = ["Doctor Strange", "Hulk", "Spider-man", "Iron Man", "Captain America", "Wolverine", "Daredevil", "Thanos", "Red SKull", "Magneto", "Green Goblin", "Doctor Doom"];

function renderButtons() {

  for (var i = 0; i < characters.length; i++) {

    var newDiv = $("<div>");

    var newButton = $("<button>");

    newButton.attr("data-topic", characters[i]);

    newButton.attr("class", "button btn btn-secondary btn-sm");

    newButton.html(characters[i]);

    newDiv.attr("class", "buttonHolder");

    newDiv.append(newButton);

    $(".button-area").append(newDiv);

  }

  characters = [];

};

$(document).on("click", ".button", function() {

  var q = $(this).data("topic");

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + q + "&limit=10&api_key=dc6zaTOxFJmzC";

  $.ajax({url: queryURL, method: "GET"})
    .done(function(response) {

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var rating = results[i].rating;

        var gifDiv = $("<div class='imageHolder'>");

        var gifRating = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img class='comicBookCharacterImage'>");

        gifImage.attr("src", results[i].images.fixed_height_still.url);

        gifImage.attr("data-state", "still");

        gifImage.attr("data-still", results[i].images.fixed_height_still.url);

        gifImage.attr("data-animate", results[i].images.fixed_height.url);

        gifDiv.append(gifImage);

        gifDiv.append(gifRating);

        $(".gif-area").prepend(gifDiv);

      }

    });

});

$(document).on("click", ".comicBookCharacterImage", function() {

  var state = $(this).attr("data-state");

  console.log(state);

  if (state == "still") {

    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");

  } else {

    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");

  }

});

$("#addCharacter").on("click", function() {

  var character = $("#character-input").val().trim();

  if(character !== "") {

    characters.push(character);

  } else {

    alert("You need to add something in the box!");

  }

  $("#character-input").val("");

  renderButtons();

  return false;

});

renderButtons();
