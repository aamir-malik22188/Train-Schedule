var config = {
    apiKey: "AIzaSyAhWT29pbLibfDSzwWK9ac_ewfINESu9wo",
    authDomain: "train-schedule-eb0d7.firebaseapp.com",
    databaseURL: "https://train-schedule-eb0d7.firebaseio.com/",
    projectId: "train-schedule-eb0d7",
    storageBucket: "train-schedule-eb0d7.appspot.com",
    messagingSenderId: "54342971070"
  };

firebase.initializeApp(config);

var database = firebase.database();


// Functionality for the submit button
$("#submit").on("click", function(event){
    event.preventDefault();

var trainName = $("#trainName").val();
var destinationName = $("#destinationName").val();
var firstTrain = moment($("#firstTrain").val(), "h:mm:ss a").format("X");
var frequency = $("#frequency").val();

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

    // log the values
    console.log(trainName);
    console.log(destinationName);
    console.log(firstTrain);
    console.log(frequency);


// Clear input fields
$("#trainName").val("");
$("#destinationName").val("");
$("#firstTrain").val("");
$("#frequency").val("")
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());

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

  // process for calculating the Next Arrival and Minutes Away fields...
  // make sure the first train time is after the eventual current time
  var firstTrainTime = moment(firstTrain, "hh:mm a").subtract(1, "years");
  // store variable for current time
  var currentTime = moment().format("HH:mm a");
  console.log("Current Time:" + currentTime);
  // store variable for difference of current time and first train time
  var trnTimeCurrentTimeDiff = moment().diff(moment(firstTrainTime), "minutes");
  // store the time left
  var timeLeft = trnTimeCurrentTimeDiff % frequency;
  // calculate and store the minutes until next train arrives
  var minutesAway = frequency - timeLeft;
  // calculate the next arriving train
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

 
  // Append the new row to the table
  $("#trainTable > tbody").append("<tr><td>" + trainName + 
                                  "</td><td>" + destinationName + 
                                  "</td><td>" + frequency + 
                                  "</td><td>" + nextArrival + 
                                  "</td><td>" + minutesAway + 
                                  "</td></tr>");
});


// alert("New Train Added");
