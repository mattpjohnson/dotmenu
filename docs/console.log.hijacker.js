var systemLog = console.log;
var logElement = document.getElementById('console-log-output');

console.log = function (message) {
    logElement.innerHTML += message + '\n';
    systemLog(message);
}
