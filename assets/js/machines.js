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

/* Search machines from NAVBAR */
async function searchMachinesFromNav() {
  const q = document.getElementById("nav-machine-search").value;

  // If empty, reload all machines
  if (q.trim() === "") {
    loadMachines();
    return;
  }

  const res = await fetch(`${API_BASE}/api/machines/search?q=${q}`);
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

  // Scroll to machines section automatically
  document
    .getElementById("machines")
    .scrollIntoView({ behavior: "smooth" });
}

