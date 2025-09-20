import "../styles/jobs.css";

document.addEventListener("DOMContentLoaded", () => {
  const jobsGrid = document.getElementById("jobs-grid");

  fetch("/api/jobs")
    .then(res => res.json())
    .then(data => {
      jobsGrid.innerHTML = "";

      data
        .filter(job => job.is_active) // only active jobs
        .sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at)) // newest first
        .forEach(job => {
          const card = document.createElement("div");
          card.classList.add("job-card");

          card.innerHTML = `
            <h3>${job.title}</h3>
            <p class="job-meta">${job.location} · ${job.job_type}</p>
            <p class="job-desc">${job.description.substring(0, 120)}...</p>
            <a href="/jobs/${job.id}.html" class="btn btn-primary">View Listing</a>
          `;

          jobsGrid.appendChild(card);
        });
    })
    .catch(err => {
      console.error("Error loading jobs:", err);
      jobsGrid.innerHTML = "<p>⚠️ Unable to load jobs at this time.</p>";
    });
});
