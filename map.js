
const map = L.map('map').setView([22.5, 78.9], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const states = {
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CT: "Chhattisgarh",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana",
  HP: "Himachal Pradesh",
  JH: "Jharkhand",
  KA: "Karnataka",
  KL: "Kerala",
  MP: "Madhya Pradesh",
  MH: "Maharashtra",
  MN: "Manipur",
  ML: "Meghalaya",
  MZ: "Mizoram",
  NL: "Nagaland",
  OR: "Odisha",
  PB: "Punjab",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TG: "Telangana",
  TR: "Tripura",
  UP: "Uttar Pradesh",
  UT: "Uttarakhand",
  WB: "West Bengal",
  AN: "Andaman and Nicobar Islands",
  CH: "Chandigarh",
  DN: "Dadra and Nagar Haveli and Daman and Diu",
  DL: "Delhi",
  JK: "Jammu and Kashmir",
  LA: "Ladakh",
  LD: "Lakshadweep",
  PY: "Puducherry"
};

const select = document.getElementById("stateSelect");
Object.entries(states).forEach(([code, name]) => {
  const o = document.createElement("option");
  o.value = code;
  o.textContent = name;
  select.appendChild(o);
});

let layer;
select.onchange = async () => {
  if (layer) map.removeLayer(layer);
  const code = select.value;
  if (!code) return;
  const res = await fetch(`geojson/${code}.geojson`);
  const data = await res.json();
  layer = L.geoJSON(data, {
    onEachFeature: (f, l) => {
      l.on('click', () => l.setStyle({fillColor: '#ffcc00', fillOpacity: 0.7}));
      l.bindTooltip(f.properties.district);
    }
  }).addTo(map);
  map.fitBounds(layer.getBounds());
};
