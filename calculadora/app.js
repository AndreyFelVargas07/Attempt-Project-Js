let numbers = [];
const result = document.querySelector('.container-result');

const numberContainer = document.querySelectorAll('.number');
const symbolsContainer = document.querySelectorAll('.symbol')

numberContainer.forEach((number) => {
  number.addEventListener("click", (e) => {
    e.preventDefault();
    valueResult(e.target.value);

  });
});

symbolsContainer.forEach((symbol)=>{
    symbol.addEventListener('click',(e)=>{
        e.preventDefault();
        valueResult(e.target.textContent);
    })
})

function valueResult(value) {
  if (value !== 'ac' && value !=='delete'&& value!=='=') {
    numbers.push(value);
    result.value = numbers.join('') 

}else if(value === '='){
    console.log('valores', result.value)
    const resultOperation = eval(result.value) 
    console.log(resultOperation);
    result.value = resultOperation;
    numbers = [];

} else if(value === 'ac'){
        numbers =[];
        result.value= '';
    }else if(value==='delete'){
        numbers.pop()
        result.value = numbers.join('')
    }
}

