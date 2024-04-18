const btnStart = document.querySelector('.button-start');

btnStart.addEventListener('click',(e)=>{    
    e.preventDefault()
    document.querySelector('.modal').style.display = 'flex';
    document.querySelector('.container-start').style.display= 'none';
   viewQuestionModal();
})

function viewQuestionModal(){
    const containerModal = document.querySelector('#container-modal')
    let containerResponse = document.querySelector('#container-response')
    let titleModal = document.querySelector('.question-number')
    let descriptionModal = document.querySelector('question')
    
    console.log(titleModal)
}