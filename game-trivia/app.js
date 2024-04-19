const btnStart = document.querySelector(".button-start");
let questionsData=[];
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
    
    for(let i = 0; i<5 ; i++){
        const indexRandom = Math.floor(Math.random() * questionsJson.length)
    
        questionsData.push(questionsJson.splice(indexRandom, 1)[0]);
    }
    loadQuestion()
}

function loadQuestion() {
    
  const containerModal = document.querySelector('#container-modal')
  let containerResponse = document.querySelector("#container-response");
  let titleModal = document.querySelector(".question-number");
  let descriptionModal = document.querySelector(".question");
  const btnAcctions = document.querySelector(".buttons-actions");

  if( count < questionsData.length ){
       const questions = questionsData[count];
       containerResponse.innerHTML = "";
       titleModal.textContent = `Question #${questions.number}`;
       descriptionModal.textContent = questions.question;
     
       for (let i = 0; i < questions.options.length; i++) {
         let responseOptions = document.createElement("div");
         responseOptions.classList.add("response");
     
         responseOptions.innerHTML = `
           <input type="radio" class="reponse-input" name"${questions.options[i]}" value="${questions.options[i]}">
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

  }else{
    containerModal.innerHTML = '';
    console.log('No hay mas pa mostrar')
  }

}

const btnNextQuestion = document.querySelector("#btn-next");

btnNextQuestion.addEventListener("click",()=>{
 count++;
console.log('Sisas', count)
loadQuestion()
});

function validatedOption(numberQuestion) {
  
  const responseOption = document.querySelectorAll(".reponse-input");
  const containerModal = document.querySelector(".modal");
  const corecctAnswers = [];

  responseOption.forEach((option) => {
    option.addEventListener('click',(e)=>{
        e.preventDefault();
        const valueSelect =e.target.value;
        corecctAnswers.push(e.target.value);
    })
    });
}

  