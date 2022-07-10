document.getElementById('get-data').addEventListener("click", getData);

// Execute a function when the user presses a key on the keyboard
var nameInput = document.getElementById('name-input');
var numberInput = document.getElementById('number-input');

nameInput.addEventListener("keypress", function(event) {
    numberInput.value = "";
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("get-data").click();
    }
});

numberInput.addEventListener("keypress", function(event) {
    nameInput.value = "";
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("get-data").click();
    }
});

function clearNumberInput() {
    numberInput.value = "";
}

function clearNameInput() {
    nameInput.value = "";
}

let baseApiURL = 'https://pokeapi.co/api/v2/pokemon';

async function getData() {
    console.log('Button was clicked!');

    if(!numberInput.value) {
        let name = document.getElementById('name-input').value.toLowerCase();
        console.log(`name = ${name}`);

        let httpResponse = await fetch(`${baseApiURL}/${name}`);
    
        if(httpResponse.status >= 200 && httpResponse.status < 300){
        let data = await httpResponse.json();
    
        populateData(data);
        }
    } else {
        let id = document.getElementById('number-input').value;
        console.log(`id = ${id}`);

        let httpResponse = await fetch(`${baseApiURL}/${id}`);
    
        if(httpResponse.status >= 200 && httpResponse.status < 300){
        let data = await httpResponse.json();
    
        populateData(data);
        }
    }
}

function populateData(response) {
    console.log(response);
    var pokemon = document.createElement('tr');
    pokemon.innerHTML = `<th scope="row">${response.id}</th>`
    pokemon.innerHTML += `<td class="text-center">${response.name.charAt(0).toUpperCase() + response.name.slice(1)}</td>`;
    pokemon.innerHTML += `<td class="text-center"><img src=${response.sprites.front_default}></td>`;
    pokemon.innerHTML += `<td class="text-center"><img src=${response.sprites.front_shiny} ></td>`;
    document.getElementById('table-body').appendChild(pokemon);
}