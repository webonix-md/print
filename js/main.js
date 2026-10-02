// Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Calculator
// ШАБЛОН: цены за единицу — примерные, заменить на цены заказчика (см. DEMO-CHECKLIST.md)
const currency = document.documentElement.lang === 'ro' ? ' lei' : ' л';
function calculatePrice() {
  const prices = {
    vizitki: 1,
    listovki: 15,
    katalogi: 100,
    bannery: 300
  };
  const type = document.getElementById('productType').value;
  const tirazh = parseInt(document.getElementById('tirazh').value) || 0;
  const dop = document.getElementById('dop').value;
  const srochnost = document.getElementById('srochnost').value;

  let basePrice = prices[type] * tirazh;
  if (dop !== '0') basePrice *= 1.3;
  if (srochnost === 'express') basePrice *= 1.3;

  document.getElementById('totalPrice').textContent = Math.round(basePrice).toLocaleString() + currency;
}
calculatePrice();

// Header scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
  else header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.08)';
});
