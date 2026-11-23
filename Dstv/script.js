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

document.querySelectorAll('.sign-btn, .plan-select').forEach((button) => {
  const openPaymentForm = () => {
    selectedPlan = button.dataset.plan;
    selectedPrice = button.dataset.price;
    document.querySelector('.selected-plan').textContent =
      `${button.dataset.plan} plan · K${button.dataset.price}/month`;
    paymentForm.reset();
    paymentStatus.textContent = '';
    paymentDialog.showModal();
    smartcardInput.focus();
  };
  button.addEventListener('click', openPaymentForm);
  button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPaymentForm();
    }
  });
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

paymentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const params = new URLSearchParams();
  params.set('plan', selectedPlan);
  params.set('price', selectedPrice);
  window.location.assign('trial.html?' + params.toString());
});

menuButton.addEventListener('click', () => {
  menuDrawer.classList.add('open');
  menuDrawer.setAttribute('aria-hidden', 'false');
});

closeMenu.addEventListener('click', () => {
  menuDrawer.classList.remove('open');
  menuDrawer.setAttribute('aria-hidden', 'true');
});

document.querySelectorAll('.tabs button').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
  });
});

document.querySelectorAll('.channels-btn').forEach((button) => {
  button.addEventListener('click', () => {
    alert(`${button.dataset.card} channel list`);
  });
});
