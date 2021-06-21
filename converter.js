// Page elements
const amountInput = document.getElementById("amount");
//const baseSelect = document.getElementById("base");
const currencySelect = document.getElementById("currency");
const result = document.getElementById("converted");

// onChange listeners
document.getElementById("amount").addEventListener("input", calculate);
//document.getElementById("base").addEventListener("change", selectCurr);
document.getElementById("currency").addEventListener("change", calculate);

const apiKey = '1ff08485efa517cb5de8f83e6cdbde23';
const url = 'http://api.exchangeratesapi.io/v1/latest?access_key=';


fetch(url + apiKey)
.then((response) => {
  return response.json();
})
.then((data) => {
  console.log(data);
  let rates = Object.entries(data.rates);
  rates.forEach(([currency, rate]) => {
    var option = document.createElement("option");
    option.value = rate;
    option.text = currency;
    currencySelect.appendChild(option);
  });
});

// For if you could change the base currency with paid version
//
// function selectCurr() {
//   currencySelect.disabled = false;
//   fetch(url + apiKey + '&base=' + baseSelect.options[baseSelect.selectedIndex].text)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     let rates = Object.entries(data.rates);
//     rates.forEach(([currency, rate]) => {
//       var option = document.createElement("option");
//       option.value = rate;
//       option.text = currency;
//       currencySelect.appendChild(option);
//     });
//   });
// }

// Result of input * rate
function sum(amount, rate) {
  if (rate == "select") {
    result.setAttribute("placeholder", "Please Select Currency");
  } else {
    result.value = (amount * rate).toFixed(2);
  }
}


// Do the sum on input or select change
function calculate() {
  sum(amountInput.value, currencySelect.value);
}