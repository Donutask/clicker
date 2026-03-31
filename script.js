const clickDisplay = document.getElementById("clicks");
const localStorageKey = "clickerClicks";

const sound = new Audio("Sounds/Click.wav");
sound.preservesPitch = false;
sound.volume = 0.5;

let clicks = 0;

function Click() {
    ChangeCount(+1);

    // Click sound
    sound.play();
}

function Subtract() {
    ChangeCount(-1);
}

//Change count and save
function ChangeCount(amount) {
    clicks += amount;

    UpdateDisplay();

    localStorage.setItem(localStorageKey, clicks)
}


// Show on page and title
function UpdateDisplay() {
    clickDisplay.innerHTML = `Clicks: <b id='number'>${clicks}</b>`;
    document.title = clicks + " clicks";
}

//Get clicks from local storage
function Load() {
    const val = parseInt(localStorage.getItem(localStorageKey));
    if (isNaN(val)) {
        clicks = 0;
    } else {
        clicks = val;
    }

    UpdateDisplay();
}

// Removes from local storage
function Reset() {
    if (confirm("Reset click count?")) {
        localStorage.removeItem(localStorageKey);
        clicks = 0;
        UpdateDisplay();
    }
}

Load();