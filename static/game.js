// Log to JS console:
console.log("Javascript Loading...")

// Access to the Document Object Model (DOM) through 'document'
// Variables declared using `let`
let button1 = document.getElementById("button1");
let textArea = document.getElementById("text");

// Listeners allow to attach code to any event:
let clicks = 0;
function handleClick() {
    console.log("button1 clicked!");
    clicks += 1;
    // We can modify the DOM or parts of it
    textArea.innerText = `Clicked ${clicks} time(s)!`;
}
button1.addEventListener("click", handleClick);

async function updateTemperature() {
    const url = '/api/bodensee';
    //const url = 'https://www.wiewarm.ch/api/v1/bad.json/16';

    // fetch lets us request a remote URL over the internet.
    let fetched = fetch(url);
    console.log(fetched);
    // Because the network request may take some time, we receive a Promise
    // instead of the actual response. We can wait until fetching is done
    // using await (but the function needs to be async for this).
    let response = await fetched;
    let json_data = await response.json();
    console.log(json_data);
    textArea.innerText = `Der Bodensee ist gerade ${json_data.temp}° warm.`;
}

let button2 = document.getElementById("button2");
button2.addEventListener("click", updateTemperature);