const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
});

  window.onscroll = function() {
    const header = document.querySelector('header');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      header.classList.add('scrolled'); // Add class when scrolled down
    } else {
      header.classList.remove('scrolled'); // Remove class when at the top
    }
  };
