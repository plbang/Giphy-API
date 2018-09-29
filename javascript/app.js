// GLOBAL VARIABLES ======================================================

// Initial array of 4 topics
var topics = ["Dog", "Rhino", "Lion", "Wolf"];




// FUNCTIONS ======================================================

function animalContent() {
  var topic = $(this).attr("data-name"); // when animalContent is called, the input text is assigned a data-name attribute
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?&api_key=8JwY8uq5blrbErSRt2G6FomhnlwmuO1s&limit=10&q=" +
    topic;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // assigning a variable to the data received
    var topicData = response.data;

    for (var i = 0; i < topicData.length; i++) {
      var rating = response.data[i].rating;
      imgURLstill = response.data[i].images.original_still.url;
      imgURLanimate = response.data[i].images.original.url;

      // creating a div to store both rating and imgURL
      var topicDiv = $("<div class='topic'>");

      // creating a div for the gif image
      var topicImage = $("<img>");
      topicImage.attr("src", imgURLstill);
      topicImage.attr("data-state", "still");
      topicImage.addClass("gif");

      // creating a p element for the rating
      var topicRating = $("<p>").text("Rating: " + rating);

      // appending both topicImage and topicRating to topicDiv
      topicDiv.append(topicImage);
      topicDiv.append(topicRating);

      // placing topicDiv before the already created topic-view ID div
      $("#topic-view").prepend(topicDiv);
    }
  });
}

// Creates Buttons
function renderButtons() {
  // each time the "Click Here" button is pressed, it clears out the previous buttons, otherwise it would duplicate the already existing button
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each topic in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of topic-btn to our button
    a.addClass("topic-btn");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

function gifState() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", imgURLanimate);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", imgURLstill);
    $(this).attr("data-state", "still");
  }
}

// MAIN PROCESS ======================================================

// Function for Submit Button
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var topic = $("#topic-input")
    .val()
    .trim();

  // Adding topic from the textbox to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our topics array
  renderButtons();
  console.log (imgURLanimate);
});


$(".gif").on('click', function() {
    gifState();
});


// Adding a click event listener to all elements with a class of "topic-btn" / animalContent is being passed in and referenced as a callback. Each button is given a data-name attribute and when clicked, it will then fire the animalContent function
$(document).on("click", ".topic-btn", animalContent);

// Calling the renderButtons function to display the intial buttons
renderButtons();
