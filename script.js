//your JS code here.

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Get user answers from session storage or initialize empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length).fill(null);

// Get DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Function to save answers to session storage
function saveProgress() {
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Function to handle answer selection
function handleAnswerChange(questionIndex, value) {
  userAnswers[questionIndex] = value;
  saveProgress();
}

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = "";
  
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    
    // Add question text without numbering
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    
    // Add choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      
      // Check if this answer was previously selected
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      
      // Add event listener to save selection
      choiceElement.addEventListener("change", () => {
        if (choiceElement.checked) {
          handleAnswerChange(i, choice);
        }
      });
      
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    
    questionsElement.appendChild(questionElement);
  }
}

// Function to calculate and display score
function calculateScore() {
  let score = 0;
  
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  
  const scoreMessage = `Your score is ${score} out of 5.`;
  scoreDiv.textContent = scoreMessage;
  
  // Store just the number in local storage
  localStorage.setItem("score", score.toString());
  
  return score;
}

// Handle form submission
function handleSubmit() {
  calculateScore();
}

// Check if score exists in local storage and display it on page load
if (localStorage.getItem("score")) {
  const savedScore = localStorage.getItem("score");
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

// Add event listener to submit button
submitButton.addEventListener("click", handleSubmit);

// Render the questions
renderQuestions();