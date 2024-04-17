const preview = document.querySelector(".preview");
const result = document.querySelector(".result");

const btnClear = document.querySelector("#clear");
const btnDelete = document.querySelector("#delete");

const keys = document.querySelector(".keys");

btnClear.addEventListener("click", clearConsole);
btnDelete.addEventListener("click", deleteCharacter);

keys.addEventListener("click", (e) => {
    if (e.target !== keys && keys.contains(e.target))
        previewInput(e.target.dataset.value);
});

document.body.addEventListener("keydown", (e) => {
    if ((e.key >= 0 && e.key <= 9) || e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === ".") {
        if (e.key === "*") previewInput("x");
        if (e.key === "/") previewInput("÷");
        else previewInput(e.key);
    }
    if (e.key === "=") {
        if (cleanInput(preview.textContent))
            calculate(...cleanInput(preview.textContent), e.key);
    }
    if (e.key === "Backspace") {
        deleteCharacter();
    }
})

function calculate(operand1, operand2, operator, nextOperator) {
    if (operator === "÷" && operand2 === 0) {
        preview.textContent = "";
        result.textContent = "Cannot divided by zero";
        return;
    }
    let output = 0;
    switch (operator) {
        case "+":
            output = Math.floor((operand1 + operand2) * 100) / 100;
            break;
        case "-":
            output = Math.floor((operand1 - operand2) * 100) / 100;
            break;
        case "x":
            output = Math.floor((operand1 * operand2) * 100) / 100;
            break;
        case "÷":
            output = Math.floor((operand1 / operand2) * 100) / 100;
            break;
    }
    preview.textContent = nextOperator === "=" ? output : (output + " " + nextOperator + " ");
    result.textContent = output;
}

function previewInput(input) {
    let inputPreview = preview.textContent;

    if (existOperators(inputPreview) && existOperators(input) || input === "=") {
        if (cleanInput(inputPreview)) {
            calculate(...cleanInput(inputPreview), input);
        } else if (input !== "=") {
            deleteCharacter();
            preview.textContent = preview.textContent + " " + input + " ";
        }
        return;
    }

    if (input === "0" && inputPreview[0] === "0") {
        preview.textContent = "0";
        return;
    }

    if (input === ".") {
        const arr = inputPreview.split(" ");;
        let operand1 = arr[0] || NaN;
        let operator = arr[1] || NaN;
        let operand2 = arr[2] || NaN;

        if (operand1 && !operand1.includes(".") && Number.isNaN(operator)) {
            operand1 += ".";
        } else if (Number.isNaN(operand1)) {
            operand1 = "0."
        }

        if (operand2 && !operand2.includes(".")) {
            operand2 += ".";
        } else if (Number.isNaN(operand2)) {
            operand2 = "0.";
        }
        preview.textContent = Number.isNaN(operator) ? operand1 : `${operand1} ${operator} ${operand2}`;
    }

    if (existOperators(input)) {
        preview.textContent = inputPreview.length === 0 ? "" : inputPreview + " " + input + " ";
    } else if (input !== ".") {
        preview.textContent = `${inputPreview}${input}`;
    }
}

function existOperators(string) {
    if (!string) return;
    const operators = ["+", "-", "x", "÷"];
    for (const operator of operators) {
        if (string.includes(operator)) {
            return true;
        }
    }
    return false;
}

function cleanInput(input) {
    const arr = input.split(" ");;
    let operand1 = arr[0] || NaN;
    let operator = arr[1] || NaN;
    let operand2 = arr[2] || NaN;

    if (Number.isNaN(operator) || Number.isNaN(operand1) || Number.isNaN(operand2)) return false;

    operand1 = operand1 - 0;
    operand2 = operand2 - 0;
    return [operand1, operand2, operator];
}

function clearConsole() {
    preview.textContent = "";
    result.textContent = "0";
}

function deleteCharacter() {
    let inputPreview = preview.textContent;
    if (inputPreview[inputPreview.length - 1] === " ") {
        preview.textContent = inputPreview.slice(0, inputPreview.length - 3);
    } else {
        preview.textContent = inputPreview.slice(0, inputPreview.length - 1);
    }
    result.textContent = "0";
}