import "../styles/homepage.css";


const carousel = document.querySelector('.jobs-carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const cards = document.querySelectorAll('.job-card');

function getCardsPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
}

function scrollCarousel(direction) {
    const card = cards[0];
    const cardStyle = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth + parseFloat(cardStyle.marginRight);
    const perView = getCardsPerView();
    carousel.scrollBy({
        left: direction * cardWidth * perView,
        behavior: 'smooth'
    });
}

prevBtn.addEventListener('click', () => scrollCarousel(-1));
nextBtn.addEventListener('click', () => scrollCarousel(1));

window.addEventListener('resize', () => {

});

