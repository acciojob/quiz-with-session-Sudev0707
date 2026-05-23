//your JS code here.

const questionsData = [
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
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questionsData.length).fill(null);

// Get DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Check if score exists in local storage and display it
window.addEventListener("DOMContentLoaded", () => {
  const savedScore = localStorage.getItem("score");
  if (savedScore) {
    scoreDiv.textContent = savedScore;
  }
});

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
  
  for (let i = 0; i < questionsData.length; i++) {
    const question = questionsData[i];
    const questionElement = document.createElement("div");
    questionElement.style.marginBottom = "20px";
    questionElement.style.padding = "10px";
    questionElement.style.border = "1px solid #ccc";
    questionElement.style.borderRadius = "5px";
    
    // Add question text
    const questionText = document.createElement("p");
    questionText.style.fontWeight = "bold";
    questionText.textContent = `${i + 1}. ${question.question}`;
    questionElement.appendChild(questionText);
    
    // Add choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceContainer = document.createElement("div");
      choiceContainer.style.margin = "5px 0";
      
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      choiceElement.setAttribute("id", `q${i}_choice${j}`);
      
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
      
      const choiceText = document.createElement("label");
      choiceText.setAttribute("for", `q${i}_choice${j}`);
      choiceText.textContent = choice;
      choiceText.style.marginLeft = "5px";
      
      choiceContainer.appendChild(choiceElement);
      choiceContainer.appendChild(choiceText);
      questionElement.appendChild(choiceContainer);
    }
    
    questionsElement.appendChild(questionElement);
  }
}

// Function to calculate and display score
function calculateScore() {
  let score = 0;
  
  for (let i = 0; i < questionsData.length; i++) {
    if (userAnswers[i] === questionsData[i].answer) {
      score++;
    }
  }
  
  const scoreMessage = `Your score is ${score} out of 5.`;
  scoreDiv.textContent = scoreMessage;
  
  // Store score in local storage
  localStorage.setItem("score", scoreMessage);
  
  return score;
}

// Handle form submission
function handleSubmit() {
  calculateScore();
}

// Add event listener to submit button
submitButton.addEventListener("click", handleSubmit);

// Render the questions
renderQuestions();

// Do not change code below this line
// This code will just display the questions to the screen
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

// Display the quiz questions and choices
function renderQuestionsOriginal() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
// renderQuestionsOriginal();