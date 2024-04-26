
const deckContainerDiv = document.querySelector('.container');

document.addEventListener('DOMContentLoaded', async()=>{
    await dataFunctionJson();
})

const dataFunctionJson = async()=>{
    const response =  await fetch('./mortys.json');
    const dataJson = await response.json();
    deckContainerDiv.innerHTML = `<img src="${dataJson[0].img}">`
    
}
