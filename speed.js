let timerquoteDisplay = document.getElementById("timer");
let uniqueId;

function setTimer() {
    let counter = 0;
    uniqueId = setInterval(function() {
        counter += 1;
        timerquoteDisplay.textContent = counter;
    }, 1000);
}
setTimer();

let questionEl = document.getElementById("quoteDisplay");
let userInputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let spinnerEl = document.getElementById("spinner");
let speedTypingTestEl = document.getElementById("speedTypingTest");
// fetching question
let randomQuestion;

function getRandomQuestionRequest() {
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };
    spinnerEl.classList.remove("d-none");
    speedTypingTestEl.classList.add("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            speedTypingTestEl.classList.remove("d-none");
            randomQuestion = jsonData.content;
            questionEl.textContent = randomQuestion;
        });
}
getRandomQuestionRequest();


let resetBtnEl = document.getElementById("resetBtn");
resetBtnEl.addEventListener("click", function() {
    clearInterval(uniqueId);
    getRandomQuestionRequest();
    timerquoteDisplay.textContent = 0;
    resultEl.textContent = "";
    userInputEl.value = "";
    setTimer();
});

let submitBtnEl = document.getElementById("submitBtn");
submitBtnEl.addEventListener("click", function() {
    let userInput = userInputEl.value;
    if (randomQuestion === userInput) {
        clearInterval(uniqueId);
        let timer = timerquoteDisplay.textContent;
        resultEl.textContent = "You typed in " + timer + " seconds";
    } else {
        resultEl.textContent = "You typed Incorrect";
    }
});