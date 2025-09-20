import "../styles/homepage.css";

const carousel = document.querySelector('.jobs-carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

function loadJobs() {
  fetch("http://localhost:3001/api/jobs")
    .then(res => res.json())
    .then(data => {
      const latestJobs = data
        .sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at))
        .slice(0, 12);

      carousel.innerHTML = "";

      latestJobs.forEach(job => {
        const card = document.createElement("div");
        card.classList.add("job-card");

        card.innerHTML = `
          <h3>${job.title}</h3>
          <p class="job-meta">${job.location} · ${job.job_type}</p>
          <p class="job-desc">${job.description.substring(0, 120)}...</p>
          <a href="/jobs/${job.id}.html" class="btn btn-secondary">View Listing</a>
        `;

        carousel.appendChild(card);
      });

      updateCardsReference();
    })
    .catch(err => console.error("Error fetching jobs:", err));
}


loadJobs();


// ================== Homepage Carousel ==================

function getCardsPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  if (window.innerWidth <= 1200) return 3;
  return 4;
}

function scrollCarousel(direction) {
  const perView = getCardsPerView();
  const containerWidth = carousel.getBoundingClientRect().width;

  carousel.scrollBy({
    left: direction * containerWidth,
    behavior: 'smooth'
  });
}

prevBtn.addEventListener('click', () => scrollCarousel(-1));
nextBtn.addEventListener('click', () => scrollCarousel(1));

window.addEventListener('resize', () => {
  carousel.scrollTo({ left: 0, behavior: "smooth" });
});


fetch("http://localhost:3001/api/jobs")
  .then(res => res.json())
  .then(data => console.log("Job Listings:", data))
  .catch(err => console.error("Error fetching jobs:", err));
