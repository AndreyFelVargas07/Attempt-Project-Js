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
  await loadQuestion();
}

let numberQuestion;
async function loadQuestion() {
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
           <input type="radio" required class="reponse-input" name="radioAnswer" value="${questions.options[i]}">
           <label for="radioAnswer">${questions.options[i]}</label>
           `;
      containerResponse.appendChild(responseOptions);
    }
    numberQuestion = questions.number; // Se guarda como parametro

    containerResponse.appendChild(btnAcctions);
    containerModal.append(titleModal, descriptionModal, containerResponse);
  } else {
    containerModal.innerHTML = "";
    const answers = evualateAnswers();
    await puntuation(answers);
  }
}

let answers = [];
const formAnswers = document.querySelector("#container-response");

formAnswers.addEventListener("submit", (e) => {
  e.preventDefault();
  count++;
  const optionSelect = document.querySelector(
    'input[name="radioAnswer"]:checked'
  ).value;
  answers.push({ number: numberQuestion, answerSelect: optionSelect });
  loadQuestion();
});

function evualateAnswers() {
  let answerCorrect = 0;
  let incorrectAnswers = 0;

  for (let i = 0; i < answers.length; i++) {
    if (questionsData[i].correct_answer === answers[i].answerSelect) {
      ++answerCorrect;
    } else if (questionsData[i].correct_answer !== answers[i].answerSelect) {
      ++incorrectAnswers;
    }
  }
  return { correctAnswers: answerCorrect, incorrectAnswers: incorrectAnswers };
}

async function puntuation(answers) {
  const { correctAnswers, incorrectAnswers } = answers;

  const containerModal = document.querySelector("#container-modal");
  const containerAnswerDiv = document.createElement("div");
  const btnFinishDiv = document.createElement("div");

  containerAnswerDiv.classList.add("container-answers");
  btnFinishDiv.classList.add("buttons-actions");

  let incorrectAnswersResponse =
    incorrectAnswers === "undefined" ? 0 : incorrectAnswers;
  let iconPutuation =
    correctAnswers < 3 ? "./images/TristeIcon.png" : "./images/felizIcon.png";

  containerAnswerDiv.innerHTML = `
  <h1  class="question-number" style="margin-bottom:30px">Finish Puntuation</h1>
  <h2 class="correct-answers">Correct Answers:<b>${correctAnswers}</b></h2>
  <h2 class="incorrect-answers">Incorrect Answers: <b>${incorrectAnswersResponse}</b></h2>
  <img class="icon-puntuation" src="${iconPutuation}" alt="Icon Puntuation" />
  `;

  btnFinishDiv.innerHTML = `<button  class="button" onclick="finishReset()" id="btn-finish">Try Again</button>`;

  containerModal.append(containerAnswerDiv, btnFinishDiv);
}

const cancelReloadFunction = () => {
  const swalWithBootstrapButtons = Swal.mixin({
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "¿Estas Seguro de Cancelar la Prueba?",
      text: "Si la cancelas perderas el progreso...",
      icon: "warning",
      iconColor: "#6E0AD1",
      padding: "20px",
      background: "#fff",
      color: "#000",
      border: "1px solid #000",
      position: "center",
      showCancelButton: true,
      confirmButtonText: "Si, Quiero Cancelarla!",
      cancelButtonText: "No, Quiero Continuar!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Se esta Cancelando la Prueba...",
          text: "Espera un momento...",
          icon: "error",
          iconColor: "#000",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
};

document.querySelector("#btn-cancel").addEventListener("click", () => {
cancelReloadFunction();
});

function finishReset(){
  setTimeout(()=>{
    window.location.reload();
  },1500)
}