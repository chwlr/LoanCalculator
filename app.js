document.querySelector('#loan-form').addEventListener('submit', delayCalculate);


function delayCalculate(e) {
  e.preventDefault();
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
}

function calculateResults() {
  // UI Variables
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');

  // UI variables for results after calculations
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalnterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute all payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  
  const monthlyConvert = convert_rupiah(Math.floor(monthly))
  const totalPay = convert_rupiah(Math.floor((monthly * calculatedPayments)))
  const totalInt = convert_rupiah(Math.floor(((monthly * calculatedPayments) - principal)))

  if (isFinite(monthly)) {
    document.querySelector('#results').style.display = 'block';
    monthlyPayment.value = monthlyConvert
    totalPayment.value = totalPay
    totalnterest.value = totalInt
    document.querySelector('#loading').style.display = 'none';
  } else {
    console.log('error');
    showError('Coba check lagi angkanya');
  }
}

function showError(error) {
  document.querySelector('#loading').style.display = 'none';
  document.querySelector('#results').style.display = 'none';

  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}

function convert_rupiah(angka) {
  var	number_string = angka.toString(),
  sisa 	= number_string.length % 3,
  rupiah 	= number_string.substr(0, sisa),
  ribuan 	= number_string.substr(sisa).match(/\d{3}/g);

  if (ribuan) {
      separator = sisa ? ',' : '';
      rupiah += separator + ribuan.join(',');
  }

  return rupiah;

}