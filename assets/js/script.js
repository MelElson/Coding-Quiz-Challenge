var score = 0;
var questionIndex = 0;
var Time = document.querySelector("#Time");
var timer = document.querySelector("#startTime");
var questionDiv = document.querySelector("#questionDiv");
// time
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var ulCreateList = document.createElement("ul");
var grade = document.getElementById('grade');

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
];

// Event Listener
timer.addEventListener("click", function () {
   
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            Time.textContent = "Time left: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                Time.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// render
function render(questionIndex) {
    // Clears existing data 
    questionDiv.innerHTML = "";
    ulCreateList.innerHTML = "";

    for (var i = 0; i < questions.length; i++) { 
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionDiv.appendChild(ulCreateList);
        ulCreateList.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// check answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) { //of answer
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv"); 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            newDiv.textContent = "Correct";
        } else {
            secondsLeft = secondsLeft - penalty;
            newDiv.textContent = "Wrong";
        }

    }
    // looks at current question
    questionIndex++;
    if (questionIndex >= questions.length) {
        
        allDone();
        newDiv.textContent =  "You got  " + questions.length + " Correct!";  // correct score
    } else {
        render(questionIndex);
    }
    questionDiv.appendChild(newDiv);

}
// All done will append last page
function allDone() {
    questionDiv.innerHTML = "";
    Time.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionDiv.appendChild(createP);

    // score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
                questionDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter initials: ";

    questionDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionDiv.appendChild(createSubmit);

    // Event listener 
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        if (initials === null) {
            console.log("Cannot be blank");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./score.html");
        }
    });

}


