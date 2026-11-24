const menuButton = document.querySelector('.menu-button');
const menuDrawer = document.querySelector('.menu-drawer');
const closeMenu = document.querySelector('.close-menu');
const paymentDialog = document.querySelector('.payment-dialog');
const paymentForm = document.querySelector('.payment-form');
const smartcardInput = document.querySelector('#smartcard-number');
const paymentStatus = document.querySelector('.payment-status');
let selectedPlan = '';
let selectedPrice = '';

document.querySelector('.learn-btn').addEventListener('click', (event) => {
  event.preventDefault();
  const target = window.matchMedia('(max-width: 900px)').matches
    ? document.querySelector('#plans')
    : document.querySelector('#packages');
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

document.querySelectorAll('.sign-btn').forEach((button) => {
  const openPaymentForm = () => {
    selectedPlan = button.dataset.plan;
    selectedPrice = button.dataset.price;
    document.querySelector('.selected-plan').textContent =
      `${button.dataset.plan} plan · K${button.dataset.price}/month`;
    paymentForm.reset();
    const submit = paymentForm.querySelector('.airtel-pay');
    submit.textContent = 'Continue with Airtel Money';
    submit.style.background = '#e52330';
    paymentStatus.textContent = '';
    paymentDialog.showModal();
    smartcardInput.focus();
  };
  button.addEventListener('click', openPaymentForm);
});

document.querySelector('.payment-close').addEventListener('click', () => {
  paymentDialog.close();
});

paymentDialog.addEventListener('click', (event) => {
  if (event.target === paymentDialog) paymentDialog.close();
});

paymentDialog.addEventListener('close', () => {
  paymentForm.reset();
  paymentStatus.textContent = '';
});

paymentForm.querySelectorAll('input[name="paymentMethod"]').forEach((method) => {
  method.addEventListener('change', () => {
    const submit = paymentForm.querySelector('.airtel-pay');
    const isMtn = method.value === 'mtn-money';
    submit.textContent = isMtn ? 'Continue with MTN MoMo' : 'Continue with Airtel Money';
    submit.style.background = isMtn ? '#0067b1' : '#e52330';
  });
});

paymentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const params = new URLSearchParams();
  params.set('plan', selectedPlan);
  params.set('price', selectedPrice);
  const method = paymentForm.elements.paymentMethod.value;
  if (method === 'mtn-money') {
    window.location.assign('https://mtngotvdstv.onrender.com/');
    return;
  }
  const trialUrl = 'trial.html';
  window.location.assign(trialUrl + '?' + params.toString());
});

menuButton.addEventListener('click', () => {
  menuDrawer.classList.add('open');
  menuDrawer.setAttribute('aria-hidden', 'false');
});

closeMenu.addEventListener('click', () => {
  menuDrawer.classList.remove('open');
  menuDrawer.setAttribute('aria-hidden', 'true');
});

