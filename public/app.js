// Initiate Firebase Connection
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

// Console Log inputs
console.log(trainName);
console.log(destinationName);
console.log(firstTrain);
console.log(frequency);


// Temporary holding of new train information
var newTrain = {
    name: trainName,
    destination: destinationName,
    time: firstTrain,
    freq: frequency
};

// Push input to Firebase
database.ref().push(newTrain);

    // log the values that will be recieved in Firebase
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


  

  // Utilizing Moment.js to calculate time
  var firstTrainTime = moment(firstTrain, "hh:mm a").subtract(1, "years");
  
  // Variable for current times
  var currentTime = moment().format("HH:mm a");
  console.log("Current Time:" + currentTime);

  // Variable to calculate the difference between current time and time of first train
  var trnTimeCurrentTimeDiff = moment().diff(moment(firstTrainTime), "minutes");

  // Time remaining
  var timeLeft = trnTimeCurrentTimeDiff % frequency;
  
  // Holding for minutes until the train arrives
  var minutesAway = frequency - timeLeft;

  // Next train arrival minutes
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

 
  // Append the new row to the table
  $("#trainTable > tbody").prepend("<tr><td>" + trainName + 
                                  "</td><td>" + destinationName + 
                                  "</td><td>" + frequency + 
                                  "</td><td>" + nextArrival + 
                                  "</td><td>" + minutesAway + 
                                  "</td></tr>");
});


