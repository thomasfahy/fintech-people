import "../styles/dashboard.css";

const jobTableBody = document.getElementById("job-table-body");
const showActive = document.getElementById("show-active");
const showInactive = document.getElementById("show-inactive");
const addJobBtn = document.getElementById("add-job-btn");

function loadJobs() {
  let query = "";
  if (showActive.checked && !showInactive.checked) query = "?active=true";
  if (!showActive.checked && showInactive.checked) query = "?active=false";

  fetch(`/api/admin/jobs${query}`)
    .then(res => res.json())
    .then(data => {
      jobTableBody.innerHTML = "";
      data.forEach(job => {
        const dateObj = new Date(job.posted_at);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");

        const formattedDate = `${day}/${month}/${year} at ${hours}:${minutes}`;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${job.title}</td>
          <td>${formattedDate}</td>
          <td>${job.job_type}</td>
          <td>${job.is_active ? "Active" : "Inactive"}</td>
          <td>
            <button onclick="markInactive(${job.id})" class="btn btn-secondary">Mark Inactive</button>
            <button onclick="deleteJob(${job.id})" class="btn btn-danger">Delete</button>
          </td>
        `;
        jobTableBody.appendChild(row);
      });
    })
    .catch(err => console.error("Error loading jobs:", err));
}


function markInactive(id) {
  fetch(`/api/admin/jobs/${id}/inactive`, { method: "PATCH" })
    .then(() => loadJobs());
}

function deleteJob(id) {
  fetch(`/api/admin/jobs/${id}`, { method: "DELETE" })
    .then(() => loadJobs());
}

window.markInactive = function (id) {
  fetch(`http://localhost:3001/api/admin/jobs/${id}/inactive`, {
    method: "PATCH",
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to mark inactive");
      return res.json();
    })
    .then(() => loadJobs()) // reload the table
    .catch(err => console.error("Error marking inactive:", err));
};

window.deleteJob = function (id) {
  fetch(`http://localhost:3001/api/admin/jobs/${id}`, {
    method: "DELETE",
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to delete job");
      return res.json();
    })
    .then(() => loadJobs()) // reload after delete
    .catch(err => console.error("Error deleting job:", err));
};

showActive.addEventListener("change", loadJobs);
showInactive.addEventListener("change", loadJobs);

addJobBtn.addEventListener("click", () => {
  alert("Open job creation form here");
});

loadJobs();
