
document.addEventListener('DOMContentLoaded',async()=>{
    await selectMortysRadom();
    createCartsMortys();
})

const btnPlay = document.querySelector(".container-button-play");

btnPlay.addEventListener("click", async () => {
  btnPlay.style.display = "none";
  await activeHoverCartsEfeccts();
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

let newData=[];
async function selectMortysRadom(){

    const response = await fetch('./mortys.json');
    let data = await response.json();
    for(let i = 0; i< 6 ; i++){
        
        const indexRandom = Math.floor(Math.random() * data.length);
        newData.push(data.splice(indexRandom,1)[0]);
    }
    
}

// Funcion para crear los backgrounds
function createCartsMortys(){
    const containerCartsHTML = document.querySelector('.container-carts');
    let count = 0
    
    
    for(let i= 0; i < 12; i++){
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('element');
        elementDiv.innerHTML = `
        <img class="element-img_background" src="./Morty-img/Backgroun-Cart.jpg" alt="">
        <img class="element-img_morty"  src="${newData[count].img}" alt="${newData[count].name}">
        `
        containerCartsHTML.appendChild(elementDiv)

        ++count;
        if(i === 5){
            count = 0;
        }
    }
    selectCarts()
}

function selectCarts(){
    const elements = document.querySelectorAll('.element');

    let pruebita= [];
    elements.forEach(element=>{
     
        element.addEventListener('click', () =>{
            
            element.querySelector('.element-img_background').style.display = 'none';
            element.querySelector('.element-img_morty').style.display = 'flex';
            
            let cartSelect = element.querySelector('.element-img_morty').alt;
            pruebita.push(cartSelect)

            for(let i =0; i< newData.length; i++){
                if(pruebita[0] === newData[i].name){
    
                    console.log(pruebita[0], newData[i].name)
                    element.querySelector('.element-img_morty').style.border = '1px solid green';
                    pruebita = [];
                    console.log(pruebita)
                }else{
                    setTimeout(()=>{
                        element.querySelector('.element-img_morty').style.display = 'none';
                        element.querySelector('.element-img_background').style.display = 'flex';
                    },1000)
                }
            }
        })
    })

    
}