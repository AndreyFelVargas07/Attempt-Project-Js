const btnPlay = document.querySelector(".container-button-play");

btnPlay.addEventListener("click", async () => {
  btnPlay.style.display = "none";
  await activeHoverCartsEfeccts();
  await selectMortysRadom();
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
        .element-img_background {
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

console.log(newData);