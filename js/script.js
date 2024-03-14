document.addEventListener("DOMContentLoaded", () => {
  // tomar elementos del DOM
  const listaPaises = document.getElementById("countries-list");
  const detallesPaises = document.getElementById("country-details");
  const cerrarBtn = document.getElementById("close-btn");

  // tomar del DOM los detalles del pais
  const flag = document.getElementById("flag");
  const name = document.getElementById("name");
  const capital = document.getElementById("capital");
  const population = document.getElementById("population");
  const road = document.getElementById("road");

  //funcion para cargar la informacion de los paises
  async function loadCountries() {
    const response = await fetch("https://restcountries.com/v3/all");
    const countries = await response.json();
    console.log(countries);
    // Ordenar los países
    countries.sort((a, b) => a.name.official.localeCompare(b.name.official)); // https://es.stackoverflow.com/questions/520589/c%C3%B3mo-ordenar-un-array-alfab%C3%A9ticamente-usando-sort
    console.log(countries);
    // mostrar los paises en el DOM
    countries.forEach((country) => {
      const countryDiv = document.createElement("div");
      countryDiv.classList.add("country");
      countryDiv.innerHTML = `<img src="${country.flags[1]}" <br> <p>${country.name.official}</p>`;
      listaPaises.appendChild(countryDiv);
      countryDiv.addEventListener("click", () => detailsCountries(country));
    });
  }

  function detailsCountries(country) {
    flag.src = country.flags[1];
    name.textContent = `Nombre: ${country.name.official}`;
    capital.textContent = `Capital: ${country.capital}`;
    population.textContent = `Poblacion: ${country.population}`;
    road.textContent = `Lado carretera: ${country.car.side}`;
    // en css está puesto display none para .hidden, al eliminarlo aparece en pantalla
    detallesPaises.classList.remove("hidden");
  }

  // Función para cerrar la ventana de detalles
  cerrarBtn.addEventListener("click", () => {
    // al añadir la clase hidden como en css está puesto en display none no aparecerá
    detallesPaises.classList.add("hidden");
  });

  loadCountries();
});
