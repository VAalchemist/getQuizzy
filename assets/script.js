// variables for page elements
// time and score
var secondsLeft = 80;
var scoreEl = document.querySelector("#score");

// sections
// section intro
var introEl = document.querySelector("#intro");

// section questions
//question section
var questionsEl = document.querySelector("#questions");
//where question goes
var questionEl = document.querySelector("#question");
// how many questions they have answered
var questionCount = 0;
// div yaynay
var yaynayEl = document.querySelector("#yesno");

// section final
var finalEl = document.querySelector("#final");
// user initials
var initialsInput = document.querySelector("#initials");

// section highscores
var highscoresEl = document.querySelector("#highscores");
// ordered list
var scoreListEl = document.querySelector("#score-list");
// array of scores
var scoreList = [];

// buttons
// start
var startBtn = document.querySelector("#start");
// answer button class
var ansBtn = document.querySelectorAll("button.ansBtn")
// answer1
var ans1Btn = document.querySelector("#answer1");
// answer2
var ans2Btn = document.querySelector("#answer2");
// answer3
var ans3Btn = document.querySelector("#answer3");
// answer4
var ans4Btn = document.querySelector("#answer4");
// submit-score
var submitScrBtn = document.querySelector("#submit-score");
// goback
var goBackBtn = document.querySelector("#goback");
// clearscores
var clearScrBtn = document.querySelector("#clearscores");
// view-scores
var viewScrBtn = document.querySelector("#view-scores");

// Object for question, answer, true/false
var questions = [ // array of objects
    {
        // question 0
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        // question 1
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        // question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        // question 3
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        // question 4
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];


// Functions

// timer
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

// start quiz with timer and set up questions
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// function to set question; takes in a count and displays the next question/answers
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// function to check answer and then move to next question
function checkAnswer(event) {
    event.preventDefault();

    // show section for yesno and append message
    yesnoEl.style.display = "block";
    var p = document.createElement("p");
    yesnoyEl.appendChild(p);

    // time out after 1 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // answer checker
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // increment so questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }
    // invoke setQuestion to display next question when an ansBtn is clicked
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    var init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // sort scores
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (var i = 0; i < scoreList.length; i++) {
        var li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // local storage
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

// retrieve scores from localStorage
function displayScores() {
    
    // parse JSON string to object
   var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    // if scores are retrieved from localStorage then update the scorelist array
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}


// start quiz/timer and question display
startBtn.addEventListener("click", startQuiz);

// loop to check answers
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// to add score
submitScrBtn.addEventListener("click", addScore);

// go back btn
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

// clear high scores
clearScrBtn.addEventListener("click", clearScores);

// high score btn show/hide
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});