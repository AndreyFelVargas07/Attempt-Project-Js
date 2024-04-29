document.addEventListener("DOMContentLoaded", async () => {
  await selectMortysRadom();
  createCartsMortys();
});

const btnPlay = document.querySelector(".container-button-play");

btnPlay.addEventListener("click", async () => {
  btnPlay.style.display = "none";
  await activeHoverCartsEfeccts();
  await selectCarts();
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
async function selectMortysRadom() {
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

let clicks = 0,
    correct = 0,
    incorrect = 0;


async function selectCarts() {

  const elements = document.querySelectorAll(".element");
  let selectMorty = [];
  let backgroundsSelects = [];
  let elementsHTML = [];
  

  
  //funcion para mostrar y ocultar una carta
  function displayStyle(element1, element2, displayStyle){
    element1.style.display = displayStyle;
    element2.style.display = displayStyle;
  }

 // funcion para limpiar los arreglos
  function resetSelects(){
    selectMorty = [];
    backgroundsSelects = [];
    elementsHTML = [];
  }


  const btnTryAgain = document.querySelector("#btn-tryagain");

  // button para reinciar
  btnTryAgain.addEventListener("click", () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
}



 function validatedScore(clicks = 0, correct = 0, incorrect = 0) {
   let score = (correct * 10) / clicks;
   score =isNaN(score) ? 0 : score; 
   
   createElementScore(clicks,score, correct)
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
            <button id="btn-tryagain">Try Again</button>
        </div>
    </div>
  `;
  containerOptions.append(optionsDivTitle);
}


function handelElementClick(elements){
 elements.forEach(element=>{
   element.addEventListener("click", () => {
     ++clicks
     const backgroundImg =  element.querySelector(".element-img_background").style.display = "none";
     const mortyImg = element.querySelector('.element-img_morty');
      backgroundImg.style.display = 'none';
      mortyImg.style.display = 'flex';

      let cartSelect = mortyImg.alt;
      let backgroundSelect = backgroundImg.alt;
      let elementSelect = mortyImg.id;
      
    })
 })
}

elements.forEach((element) => {
  element.addEventListener("click", () => {
    ++clicks
    element.querySelector(".element-img_background").style.display = "none";
    element.querySelector(".element-img_morty").style.display = "flex";

    let cartSelect = element.querySelector(".element-img_morty").alt;
    let backgroundSelect = element.querySelector(".element-img_background").alt;
    let elementSelect = element.querySelector(".element-img_morty").id;

    selectMorty.push(cartSelect);
    backgroundsSelects.push(backgroundSelect);
    elementsHTML.push(elementSelect);

    if (selectMorty[1]) {
      //CORRECT SELECT
      if ( selectMorty[0] === selectMorty[1] && backgroundsSelects[0] !== backgroundsSelects[1]) {
        ++correct;
        const element1 = document.getElementById(elementsHTML[0]);
        const element2 = document.getElementById(elementsHTML[1]);

        element1.style.border = "5px solid #0BF845";
        element2.style.border = "5px solid #0BF845";

        resetSelects()
      } else {
        ++incorrect;
        //FALSE SELECT
        const element1 = document.getElementById(elementsHTML[0]);
        const element2 = document.getElementById(elementsHTML[1]);

        const background1 = document.querySelector(`img[alt="${backgroundsSelects[0]}"]`);
        const background2 = document.querySelector(`img[alt="${backgroundsSelects[1]}"]`);

        element1.style.border = "5px solid #F70909";
        element2.style.border = "5px solid #F70909";
        
        setTimeout(() => {

          displayStyle(element1,element2, 'none')
          displayStyle(background1, background2, 'flex')
          resetSelects()
          
        }, 1000);
      } 
      validatedScore(clicks, correct, incorrect); 
    }
  });
  
 
});
