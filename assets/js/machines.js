const API_BASE = "https://ies-backend-wbhs.onrender.com";

/* Load all machines */
async function loadMachines() {
  const container = document.getElementById("machines-container");
  if (!container) return; // ✅ safety check

  const res = await fetch(`${API_BASE}/api/machines`);
  const machines = await res.json();

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
  const input = document.getElementById("nav-machine-search");
  const container = document.getElementById("machines-container");

  if (!input || !container) return; // ✅ safety check

  const q = input.value;

  // If empty → reload all machines
  if (q.trim() === "") {
    loadMachines();
    return;
  }

  const res = await fetch(
    `${API_BASE}/api/machines/search?q=${q}`
  );
  const machines = await res.json();

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

  // ✅ Auto scroll to machines section
  document
    .getElementById("machines")
    .scrollIntoView({ behavior: "smooth" });
}

/* Auto load machines when page opens */
window.addEventListener("load", loadMachines);
