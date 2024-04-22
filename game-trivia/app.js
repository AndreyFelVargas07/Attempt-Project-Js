const btnStart = document.querySelector(".button-start");
let questionsData = [];
let count = 0;
btnStart.addEventListener("click", async (e) => {
  e.preventDefault();
  document.querySelector(".modal").style.display = "flex";
  document.querySelector(".container-start").style.display = "none";
  await createQuestions();
});

async function createQuestions() {
  const response = await fetch("./questions.json");
  let questionsJson = await response.json();

  for (let i = 0; i < 5; i++) {
    const indexRandom = Math.floor(Math.random() * questionsJson.length);

    questionsData.push(questionsJson.splice(indexRandom, 1)[0]);
  }
  loadQuestion();
}

function loadQuestion() {
  const containerModal = document.querySelector("#container-modal");
  let containerResponse = document.querySelector("#container-response");
  let titleModal = document.querySelector(".question-number");
  let descriptionModal = document.querySelector(".question");
  const btnAcctions = document.querySelector(".buttons-actions");

  if (count < questionsData.length) {
    const questions = questionsData[count];
    containerResponse.innerHTML = "";
    titleModal.textContent = `Question #${count + 1}`;
    descriptionModal.textContent = questions.question;

    for (let i = 0; i < questions.options.length; i++) {
      let responseOptions = document.createElement("div");
      responseOptions.classList.add("response");

      responseOptions.innerHTML = `
           <input type="radio" class="reponse-input" name="${questions.options[i]}" value="${questions.options[i]}">
           <label for="${questions.options[i]}">${questions.options[i]}</label>
           `;
      containerResponse.appendChild(responseOptions);
    }

    containerModal.append(
      titleModal,
      descriptionModal,
      containerResponse,
      btnAcctions
    );
    validatedOption(questions.number);
  } else {
    containerModal.innerHTML = "";
    console.log("No hay mas pa mostrar");
    const answers = evualateAnswers();
    console.log(answers);

  }
}

const btnNextQuestion = document.querySelector("#btn-next");

btnNextQuestion.addEventListener("click", () => {
  count++;
  loadQuestion();
});

let answers = [];
function validatedOption(numberQuestion) {
  const responseOption = document.querySelectorAll(".reponse-input");
  let optionSelect;

  for (let i = 0; i < responseOption.length; i++) {
    responseOption[i].addEventListener("click", () => {
      console.log(responseOption[i].value);
      optionSelect = responseOption[i].value;
      answers.push({ number: numberQuestion, answerSelect: optionSelect });
    });
  }
}

function evualateAnswers() {
  let answerCorrect = 0;
  let incorrectAnswers = 0;
  console.log(answers)
  console.log(questionsData);
  for (let i = 0; i < answers.length; i++) {
    if (questionsData[i].correct_answer === answers[i].answerSelect) {
      ++answerCorrect      
    } else if(questionsData[i].correct_answer !== answers[i].answerSelect){
      ++incorrectAnswers     
    }
  }
    return {correctAnswers: answerCorrect, incorrectAnswers: incorrectAnswers };
}
