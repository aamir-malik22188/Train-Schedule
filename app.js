// Initialize Firebase
var config = {
  apiKey: "AIzaSyAxkfPnASVLrMfHLmJ7IqNWgtorCvkWDgk",
  authDomain: "train-schedule-4ec28.firebaseapp.com",
  databaseURL: "https://train-schedule-4ec28.firebaseio.com",
  projectId: "train-schedule-4ec28",
  storageBucket: "train-schedule-4ec28.appspot.com",
  messagingSenderId: "89326754176"
};
firebase.initializeApp(config);

var database = firebase.database();


// Functionality for the submit button
$(".btn-primary").on("click", function(event){
    event.preventDefault();

var trainName = $("#trainName").val().trim();
var destinationName = $("#destinationName").val().trim();
var firstTrain = moment($("#firstTrain").val().trim(), "h:mm:ss a").format("X");
var frequency = $("#frequency").val().trim();

console.log(trainName);
console.log(destinationName);
console.log(firstTrain);
console.log(frequency);


var newTrain = {
    name: trainName,
    destination: destinationName,
    time: firstTrain,
    freq: frequency
};

database.ref().push(newTrain);


// Clear input fields
$("#trainName").val("");
$("#destinationName").val("");
$("#firstTrain").val("");
$("#frequency").val("")
});

database.ref().on("child_added", function(childSnapshot){

    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;

    var minutesAway = moment().diff(moment(firstTrain, "X"), "minutes");
  
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destinationName),
    $("<td>").text(frequency),
    $("<td>").text(firstTrain),
    $("<td>").text(minutesAway) 
  );

  // Append the new row to the table
  $("#trainTable > tbody").append(newRow);
});

alert("New Train Added");
