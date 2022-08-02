const bill = document.getElementById('inpBill')
const tipBtns = document.querySelectorAll('.btn')
const tipCustom = document.getElementById('inpTip')
const people = document.getElementById('inpPeople')
const errorMsg = document.querySelector('.errorMSG')
const results = document.querySelectorAll('.value')
const resetBtn = document.querySelector('.reset')

// eventos
bill.addEventListener('input', setBillValue)
tipBtns.forEach((btn) => {
  btn.addEventListener('click', handleClick) // percorro um array e assim me passando o seguinte numero clicado
})
tipCustom.addEventListener('input', setTipCustomValue)
people.addEventListener('input', setPeopleValue)
resetBtn.addEventListener('click', reset)

let billValue = 0.0 // valor padrão
let tipValue = 0.15 // valor padrão -> 15% botão esta ativo
let peopleValue = 0 // valor padrão

function validateFloat(s) {
  let rgx = /^[0-9]*\.?[0-9]*$/
  return s.match(rgx)
}

function validateInt(s) {
  let rgx = /^[0-9]*$/
  return s.match(rgx)
}

// função que tras uma condição para que independente da tecla sendo ela ',' ou '.' ela me retorna '.'
function setBillValue() {
  if (bill.value.includes(',')) {
    bill.value = bill.value.replace(',', '.')
  }

  // você não pode vê-lo. mas esta parte do código cortou todos os caracteres inválidos
  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1)
  }

  // permitindo numeros flutuantes
  billValue = parseFloat(bill.value)

  calculateTip()
}

//
function handleClick(e) {
  // passando um loop para percorrer o array de btns
  tipBtns.forEach((btn) => {
    // desativando o actice do btn em especifico
    btn.classList.remove('btnActive')

    // e ativando o active no btn desejado
    if (e.target.innerHTML == btn.innerHTML) {
      btn.classList.add('btnActive')
      // passando o valor da porcentagem de cada botão clicado
      tipValue = parseFloat(btn.innerHTML) / 100
    }
  })

  // limpar custom tip ao clicar em outra porcentagem
  tipCustom.value = ''

  calculateTip()

  console.log(tipValue)
}

// validar antes de criar essa função

// essa função ela faz com o que eu nao consiga colocar nenhum tipo de string aqui e somente numeros
function setTipCustomValue() {
  if (!validateInt(tipCustom.value)) {
    tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1)
  }
  // apenas números inteiros permitidos
  tipValue = parseFloat(tipCustom.value / 100)

  // remover o estado ativo dos botões
  /*tipBtns.forEach((btn) => {
    btn.classList.remove('btnActive')
  })*/

  // se o custom tip nao for igual a nada ativa a função de calcular a porcentagem costomizada
  if (tipCustom.value !== '') {
    calculateTip()
  }

  console.log(tipValue)
}

// essa função ela faz com o que eu nao consiga colocar nenhum tipo de string aqui e somente numeros
function setPeopleValue() {
  if (!validateInt(people.value)) {
    people.value = people.value.substring(0, people.value.length - 1)
  }
  // apenas number inteiro
  peopleValue = parseFloat(people.value)

  // se as pessoas forem igual a zero aparece a mensagem de erro caso contrario ela some
  if (peopleValue == 0) {
    errorMsg.classList.add('show-error-msg')
  } else {
    errorMsg.classList.remove('show-error-msg')
  }

  calculateTip()
  console.log(peopleValue)
}

// essa função passa a condição que se o tanto de pessoas for maior que um tem as seguintes contas para ser feita
function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue // exemplo 10 X 0.15(que seria 15%) / pela quantidade de pessoa
    let total = (billValue * (tipValue + 1)) / peopleValue
    results[0].innerHTML = '$' + tipAmount.toFixed(2) // passando o resultado para o primeiro valor e colocando somente 2 numero após a virgula
    results[1].innerHTML = '$' + total.toFixed(2) // passando o resultado para o segundo valor e colocando somente 2 numero após a virgula
  }
}

// função de reset tendo ela como um recomeço de um conta nova.
function reset() {
  bill.value = ''
  setBillValue()

  tipBtns[2].click()

  people.value = '0'
  setPeopleValue()
}

console.log(tipBtns[0].innerHTML)
console.log(bill.value)
