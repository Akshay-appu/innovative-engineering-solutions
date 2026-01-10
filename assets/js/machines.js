const API_BASE = "https://ies-backend-wbhs.onrender.com";

/* Load all machines */
async function loadMachines() {
  const res = await fetch(`${API_BASE}/api/machines`);
  const machines = await res.json();

  const container = document.getElementById("machines-container");
  container.innerHTML = "";

  machines.forEach(m => {
    container.innerHTML += `
      <div class="col-lg-4 col-md-6">
        <div class="card h-100">
          <img src="${m.image_url}" class="card-img-top" alt="${m.machine_name}">
          <div class="card-body">
            <h5 class="card-title">${m.machine_name}</h5>
            <p class="card-text">${m.description}</p>
            <span class="badge bg-primary">${m.category}</span>
          </div>
        </div>
      </div>
    `;
  });
}

/* Search machines */
async function searchMachines() {
  const q = document.getElementById("machine-search").value;
  const res = await fetch(`${API_BASE}/api/machines/search?q=${q}`);
  const machines = await res.json();

  const container = document.getElementById("machines-container");
  container.innerHTML = "";

  machines.forEach(m => {
    container.innerHTML += `
      <div class="col-lg-4 col-md-6">
        <div class="card h-100">
          <img src="${m.image_url}" class="card-img-top">
          <div class="card-body">
            <h5>${m.machine_name}</h5>
            <p>${m.description}</p>
          </div>
        </div>
      </div>
    `;
  });
}

/* Auto load machines when page opens */
window.addEventListener("load", loadMachines);
