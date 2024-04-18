const btnStart = document.querySelector('.button-start');

btnStart.addEventListener('click',(e)=>{    
    e.preventDefault()
    document.querySelector('.modal').style.display = 'flex';
    document.querySelector('.container-start').style.display= 'none';
   
})