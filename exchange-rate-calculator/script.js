const currencyEl_1 = document.getElementById('currency-one');
const currencyEl_2 = document.getElementById('currency-two');
const amountEl_1 = document.getElementById('amount-one');
const amountEl_2 = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');

const swap = document.getElementById('swap');

// Fetch exchange rate and update DOM
function calculate() {
  const currency_1 = currencyEl_1.value;
  const currency_2 = currencyEl_2.value;

  fetch(`https://api.exchangerate.host/latest?base=${currency_1}`)
    .then((res) => res.json())
    .then((data) => {
      const rates = data.rates[currency_2];
      rateEl.textContent = `1 ${currency_1} = ${rates} ${currency_2}`;
      amountEl_2.value = (amountEl_1.value * rates).toFixed(2);
    });
}

// Event listenerrs
currencyEl_1.addEventListener('change', calculate);
amountEl_1.addEventListener('input', calculate);
currencyEl_2.addEventListener('change', calculate);
amountEl_2.addEventListener('input', calculate);
swap.addEventListener('click', () => {
  const temp = currencyEl_1.value;
  currencyEl_1.value = currencyEl_2.value;
  currencyEl_2.value = temp;
  calculate();
});

calculate();
