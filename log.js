// Every change to the click count is logged. 
// This could be used for data analysis
// Just disable this if you don't want logs 
let ENABLE_LOGGING = true;

class LogEntry {
    t;
    a;
    c;

    constructor(timestamp, action, count) {
        this.t = timestamp;
        this.a = action;
        this.c = count;
    }
}

changeLog = null;
const logStorageKey = "clickerLogs";

function LogChange(changeType) {
    if (!ENABLE_LOGGING) {
        return;
    }
    // Logs loaded when data modified to not hang loading
    if (!changeLog) {
        LoadLogs();
    }
    entry = new LogEntry(Date.now(), changeType, clicks);

    changeLog.push(entry);

    localStorage.setItem(logStorageKey, JSON.stringify(changeLog));
}

function LoadLogs() {
    data = localStorage.getItem(logStorageKey)
    if (data) {
        changeLog = JSON.parse(data);
    }
}
