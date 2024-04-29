document.addEventListener("DOMContentLoaded", async () => {
  await createCartsMorty();
  createCartsMortys();
});

const btnPlay = document.querySelector(".container-button-play");

btnPlay.addEventListener("click", async () => {
  btnPlay.style.display = "none";
  await activeHoverCartsEfeccts();
  selectCarts();
});

// Funcion para agregar los estilos del hover a las cartas
async function activeHoverCartsEfeccts() {
  const styleHTML = document.createElement("style");

  styleHTML.innerHTML = `
        .element:hover {
         width: 220px;
         height: 220px;
         margin-right: 15px;
           }
        .element-img_background:hover {
         transform: scale(1.1);
         border-radius: 5px;
         box-shadow: 1px 1px 5px 1px #fff;
         width: 220px;
         height: 220px;
          } 
    `;

  document.querySelector("head").appendChild(styleHTML);
}

// Funcion que me retorna aleatoriamente 6 objetos del json

let dataJson = [];
async function createCartsMorty() {
  const response = await fetch("./mortys.json");
  let data = await response.json();
  for (let i = 0; i < 6; i++) {
    const indexRandom = Math.floor(Math.random() * data.length);
    dataJson.push(data.splice(indexRandom, 1)[0]);
  }
}

// Funcion para crear los backgrounds
function createCartsMortys() {
  const containerCartsHTML = document.querySelector(".container-carts");
  let count = 0;

  for (let i = 0; i < 12; i++) {
    const elementDiv = document.createElement("div");
    elementDiv.classList.add("element");
    elementDiv.innerHTML = `
        <img class="element-img_background" src="./Morty-img/Backgroun-Cart.jpg" alt="background${i}">
        <img class="element-img_morty" id="morty${i}"  src="${dataJson[count].img}" alt="${dataJson[count].name}">
        `;
    containerCartsHTML.appendChild(elementDiv);

    ++count;
    if (i === 5) {
      count = 0;
    }
  }
}

// funcion para la seleccion de cartas
function selectCarts() {

  const elements = document.querySelectorAll(".element");
  elements.forEach(element => {
    element.addEventListener("click", () => {
      handleElementClick(element);
    });
  });
}
// variables Globales
let selectMorty = [];
let backgroundsSelects = [];
let idElementSelected = [];
let clicks = 0;
let correct = 0;
let incorrect = 0;

// Funcion para manejar el evento click y recorrer los elementos
 function handleElementClick(element){
  ++clicks
  const backgroundImg = element.querySelector(".element-img_background");
  const mortyImg = element.querySelector('.element-img_morty');
   backgroundImg.style.display = 'none';
   mortyImg.style.display = 'flex';

   let cartSelect = mortyImg.alt;
   let selectedBackground = backgroundImg.alt;
   let idElementSelect = mortyImg.id;
   
 selectMorty.push(cartSelect);
 backgroundsSelects.push(selectedBackground);
 idElementSelected.push(idElementSelect);
 validateSelectdElements(selectMorty, backgroundsSelects, idElementSelected)

}

// Funcion que valida las selecciones
function validateSelectdElements(selectMorty,backgroundsSelects, idElementSelected ){
if (selectMorty[1]) {
//CORRECT SELECT
if ( selectMorty[0] === selectMorty[1] && backgroundsSelects[0] !== backgroundsSelects[1]) {
  ++correct;
  const element1 = document.getElementById(idElementSelected[0]);
  const element2 = document.getElementById(idElementSelected[1]);

  element1.style.border = "5px solid #0BF845";
  element2.style.border = "5px solid #0BF845";

  resetSelectsArrays()
} else {
  ++incorrect;
  //FALSE SELECT
  const element1 = document.getElementById(idElementSelected[0]);
  const element2 = document.getElementById(idElementSelected[1]);

  const background1 = document.querySelector(`img[alt="${backgroundsSelects[0]}"]`);
  const background2 = document.querySelector(`img[alt="${backgroundsSelects[1]}"]`);

  element1.style.border = "5px solid #F70909";
  element2.style.border = "5px solid #F70909";
  
  setTimeout(() => {

    editStyleDisplay(element1,element2, 'none')
    editStyleDisplay(background1, background2, 'flex')
    resetSelectsArrays()
    
  }, 1000);
} 
validatedScore(clicks, correct, incorrect); 
}
}

  //funcion para mostrar y ocultar una carta
  function editStyleDisplay(element1, element2, displayStyle){
    element1.style.display = displayStyle;
    element2.style.display = displayStyle;
  }
 // funcion para limpiar los arreglos
  function resetSelectsArrays(){
    selectMorty = [];
    backgroundsSelects = [];
    idElementSelected = [];
  }


 function validatedScore(clicks = 0, correct = 0, incorrect = 0) {
   let score = (correct * 10) - clicks;
   score =isNaN(score) ? 0 : score; 
   
   createElementScore(clicks,score - incorrect, correct)
  }
  
  function createElementScore(clicks,  score, correct){
    const containerOptions = document.querySelector(".container-options");
    const optionsDivTitle = document.createElement("div");
    optionsDivTitle.classList.add("container-title");  
    
    containerOptions.innerHTML = '';
    optionsDivTitle.innerHTML = `
  <div class="container-title">
        <div class="container-title_score">
        <h2>Clicks: ${clicks}</h2>
        <h2>Score: ${score}</h2>
        <h2>Correct:${correct}/6</h2>

        </div>  
        <div class="container-title_button">
            <button id="btn-tryagain"  onclick="window.location.reload()">Try Again</button>
        </div>
    </div>
  `;
  if(correct === 6) {
    
    finishGame(score, clicks, incorrect);
    optionsDivTitle.innerHTML=''
  }
  containerOptions.append(optionsDivTitle);
}

function finishGame(score, clicks, incorrect, time){
  const container = document.querySelector('.container-carts');
  const containerFinish  = document.createElement('div')
  const titleGame = document.querySelector('.title-game');
  
  containerFinish.classList.add('container-finish');

  titleGame.innerHTML = '';
  container.innerHTML = '';
  containerFinish.innerHTML = `
  <h1 style="color:#09f; font-size:50px; margin-bottom: 15px;"> Congratulations Has Finish<b style="color:#fff;"> Morty Game</b></h1>
  <h2>Score: <b style="color:#09f;"> ${score}</b></h2>
  <h2>Clicks:<b style="color:#09f;"> ${clicks}</b></h2>
  <h2>Errores:<b style="color:#09f;"> ${incorrect}</b></h2>
  <h2>Time: <b style="color:#09f;">${time}</b></h2>

  <button class="btn-finish" onclick="window.location.reload()"> Play Again </button>
  `
  container.appendChild(containerFinish)
}
