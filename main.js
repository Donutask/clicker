const clickDisplay = document.getElementById("clicks");
const subtractButton = document.getElementById("subtract");
const clicksStorageKey = "clickerClicks";

const sound = new Audio("Sounds/Click.wav");
sound.volume = 0.5;

let clicks = 0;
let clicksNoun = "Clicks";

function Click() {
    ChangeCount(+1);

    // Click sound
    sound.play();
}

function Subtract() {
    if (clicks > 0) {
        ChangeCount(-1);
    }
}

//Change count and save
function ChangeCount(amount) {
    clicks = Math.round(clicks + amount);

    UpdateDisplay();

    localStorage.setItem(clicksStorageKey, clicks);
    LogChange(amount > 0 ? "+" : "-")
}

// Show on page and title
function UpdateDisplay() {
    clickDisplay.innerHTML = `${clicksNoun}: <b id='number'>${clicks}</b>`;
    // Avoid having singular form :)
    if (clicks > 1) {
        document.title = clicks + " " + clicksNoun;
    } else {
        document.title = "Just a Clicker";
    }

    // Can't make it negative
    const hiddenClass = "subtract-hidden"
    if (clicks <= 0) {
        subtractButton.classList.add(hiddenClass)
    } else if (subtractButton.classList.contains(hiddenClass)) {
        subtractButton.classList.remove(hiddenClass);
    }
}

//Get clicks from local storage
function Load() {
    const val = parseInt(localStorage.getItem(clicksStorageKey));
    if (isNaN(val)) {
        clicks = 0;
    } else {
        clicks = val;
    }

    UpdateDisplay();
}


// Just back to 0
function SoftReset() {
    if (confirm("Set count back to 0?")) {
        clicks = 0;
        LogChange("R")
        localStorage.removeItem(clicksStorageKey);
        CloseOptions();
        UpdateDisplay();
    }
}

// Removes everything from local storage
function HardReset() {
    if (confirm("Fully reset count, settings, and all logs?")) {
        localStorage.removeItem(clicksStorageKey);
        localStorage.removeItem(logStorageKey);
        localStorage.removeItem(clickerNounKey);

        clicks = 0;
        clicksNoun = "Clicks";
        changeLog = [];
        CloseOptions();
        UpdateDisplay();
    }
}

LoadNoun();
Load();