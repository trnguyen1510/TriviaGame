$(document).ready(function(){
    var options = [
        {
            question: "Which bird has eyes that are larger than its brain?", 
            choice: ["Ostrich","Chicken","Dove","Owl"], 
            answer: 0, 
            photo: "assets/images/n-ostrich-a-20171231-870x653.jpg"
        },

        {
            question: "What is the only mammal born with horns?", 
            choice: ["Moose", "Giraffe","Rhino","Buffalo"],
            answer: 1, 
            photo: "assets/images/Giraffe.jpg"
        },

        {
            question: "What are female elephants called?",
            choice: ["Female Elephants","Rhinos","Cows","Buffalos"],
            answer: 2,
            photo: "assets/images/n-elephants-a-20180924-870x653.jpg"
        },
        {
            question: "What is the tallest animal in the world?",
            choice: ["Giraffe", "Elephant","Cow","Deer"],
            answer: 0,
            photo: "assets/images/Giraffe.jpg"

        },
        {
            question: "How many legs does a lobster have?",
            choice:["10","4","6","8"],
            answer: 3,
            photo: "assets/images/lobster-emoji.jpg"

        },
        {
            question: "Which is the largest mammal in the world?",
            choice: ["elephant","giraffe","dragon","blue whale"],
            answer: 3,
            photo: "assets/images/_97464944_gettyimages-529743649.jpg"

        },
        {
            question: "How many humps does a bactrian camel have?",
            choice: ["0","2","4","3"],
            answer: 1,
            photo: "assets/images/13_Camel.jpg"

        },
        {
            question: "Murder is the collective noun for a group of which bird?",
            choice: ["Owls","Hummingbirds","Crows","Doves"],
            answer: 2,
            photo: "assets/images/crow.jpg"

        },
        {
            question: "What do adult frogs and toads lack?",
            choice: ["brain","legs","tail","heart"],
            answer: 2,
            photo: "assets/images/frog-1.jpg"
        },
        {
            question: "Sika, fallow, and Roe, are what types of animal?",
            choice: ["deer","horse","dog","cat"],
            answer: 0, 
            photo: "assets/images/7ok00kla-2-1537371885.jpg"

        }];
    
        var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}

function displayQuestion() {
	index = Math.floor(Math.random()*options.length);
	pick = options[index];


		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);

}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})