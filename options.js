const optionsModal = document.getElementById("optionsModal");

const clickerNounKey = "clickerNoun";

function OpenOptions() {
    optionsModal.showModal();
}

// Change from "Clicks" to whatever else
function Rename() {
    response = prompt(`Rename ${clicksNoun} to...?`);
    if (response) {
        clicksNoun = response.trim();
        UpdateDisplay();
        localStorage.setItem(clickerNounKey, clicksNoun);
    }
}

// Asks for integer
function SetValue() {
    response = prompt(`Set ${clicksNoun} to what value...?`);
    if (response) {
        num = Number.parseInt(response);
        if (num && Number.isInteger(num)) {
            clicks = num;
            LogChange("S");
            UpdateDisplay();
            localStorage.setItem(clicksStorageKey, clicks);
        }
    }
}

// Loads logs if not loaded and writes to clipboard
function CopyLogs() {
    if (!changeLog) {
        LoadLogs();
    }

    if (changeLog) {
        logs = JSON.stringify(changeLog);
        navigator.clipboard.writeText(logs);
        alert("Copied logs to clipboard");
    } else {
        alert("No logs to copy");
    }
}

function CloseOptions() {
    optionsModal.close();
}

function LoadNoun() {
    data = localStorage.getItem(clickerNounKey);
    if (data) {
        clicksNoun = data;
    }
}