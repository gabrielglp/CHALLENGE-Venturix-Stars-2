const bill = document.getElementById('inpBill')

bill.addEventListener('input', setBillValue)

let billValue = 0.0

function validateFloat(s) {
  let rgx = /^[0-9]*\.?[0-9]*$/
  return s.match(rgx)
}

function setBillValue() {
  if (bill.value.includes(',')) {
    bill.value = bill.value.replace(',', '.')
  }

  // você não pode vê-lo. mas esta parte do código cortou todos os caracteres inválidos
  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1)
  }

  billValue = parseFloat(bill.value)
  console.log(billValue)
}

console.log(bill)
console.log(bill.value)
