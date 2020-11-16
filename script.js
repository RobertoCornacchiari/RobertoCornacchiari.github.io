
const urlPaesi = "https://api.covid19api.com/countries"
const urlSummary = "https://api.covid19api.com/summary";

const combo = document.getElementById("Combo");
const pagina = document.getElementById("data");

let vettore = [];
let summary = [];

getSummary(urlSummary);
listaPaesi(urlPaesi);


const elenco = document.getElementById("paesi");

function listaPaesi(url){
	fetch(url)
	.then(lista => lista.json())
	.then(file => {
		file.forEach(x => {
			vettore.push(x.Slug);
		})})
	.then(() => {
			vettore.sort();
			vettore.forEach(x => {
				const a = document.createElement("option");
				a.innerHTML = x;
				combo.appendChild(a);
			})
		})
}

function getSummary(url){
	fetch(url)
	.then(lista => lista.json())
	.then(file => {
		summary = file.Countries;
	})
}

function trovaDati(){
	const paese = combo.options[combo.selectedIndex].value;
	
	let country;
	summary.forEach(x => {
		if (x.Slug === paese){
			country = x;
		}
	})
	console.log(country);
	
	const container = document.createElement("div");
	container.className = "container";
	
	const rowF = document.createElement("row");
	rowF.className = "row";
	container.appendChild(rowF);

	const row = document.createElement("row");
	row.className = "row";
	container.appendChild(row);


	const flag = document.createElement("div");
	flag.id = "flag";
	flag.className = "col-auto card";
	row.appendChild(flag);
	let image = document.createElement("img");
	image.id = "immagine";
	
	image.setAttribute("src", "https://www.countryflags.io/" + country.CountryCode + "/shiny/64.png");
	flag.appendChild(image);

	const confirmed = document.createElement("div");
	confirmed.id = "confirmed";
	confirmed.className = "col card";
	confirmed.innerHTML = "<h1>Confirmed:</h1></br>";
	confirmed.innerHTML += "<h2>" + country.TotalConfirmed + "(+" + country.NewConfirmed + ")</h2>";
	row.appendChild(confirmed);
	

	const recovered = document.createElement("div");
	recovered.id = "recovered";
	recovered.className = "col card";
	recovered.innerHTML = "<h1>Recovered:</h1></br>";
	recovered.innerHTML += "<h2>" + country.TotalRecovered + "(+" + country.NewRecovered + ")</h2>";
	row.appendChild(recovered);

	const deaths = document.createElement("div");
	deaths.id = "deaths";
	deaths.className = "col card";
	deaths.innerHTML = "<h1>Deaths:</h1></br>";
	deaths.innerHTML += "<h2>" + country.TotalDeaths + "(+" + country.NewDeaths + ")</h2>";
	row.appendChild(deaths);

	pagina.appendChild(container);
}
