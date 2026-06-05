const input = document.getElementById("command-input");
const output = document.getElementById("output");
const terminalBody = document.querySelector(".terminal-body");

let commandHistory = [];
let historyIndex = -1;

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        const command = input.value.trim();

        if (command === "" ) {
            return;
        }

        if (command !== "") {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
        }

        output.innerHTML += `
            <br>
            <span class="prompt">tanishq@portfolio:~$</span>
            ${command}
        `;

        executeCommand(command);

        input.value = "";
    }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            if(historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        }

        if (event.key === "ArrowDown") {

            event.preventDefault();

            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            }
            else {
                historyIndex = commandHistory.length;
                input.value = "";
            }
        }
});

function executeCommand(command) {

    command = command.toLowerCase();

    if (command === "clear") {
        output.innerHTML = "";
        return;
    }

    if (commands[command]) {
        output.innerHTML += `
        <br><br>
        ${commands[command]()}
        <br><br>
        `;
    }

    else {
        output.innerHTML += `
        <br><br>
        Command not found: ${command}
        <br><br>
        `;
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
}