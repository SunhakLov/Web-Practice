const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");

const hasNumber = document.getElementById("number");
const hasChar = document.getElementById("char");

const length1 = document.getElementById("length");

const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"];

const charOnly = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"];

const numberOnly = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function generatePassword(event) {
    event.preventDefault();
    const length = Number(length1.value);

    let password1 = "";
    let password2 = "";
    if (hasNumber.checked && hasChar.checked) {
        for (let i = 0; i < length; i++) {
            password1 += characters[Math.floor(Math.random() * characters.length)];
            password2 += characters[Math.floor(Math.random() * characters.length)];
        }
    }
    else if (hasChar.checked && hasNumber.checked === false) {
        for (let i = 0; i < length; i++) {
            password1 += charOnly[Math.floor(Math.random() * charOnly.length)];
            password2 += charOnly[Math.floor(Math.random() * charOnly.length)];
        }
    }
    else if (hasChar.checked === false && hasNumber.checked) {
        for (let i = 0; i < length; i++) {
            password1 += numberOnly[Math.floor(Math.random() * numberOnly.length)];
            password2 += numberOnly[Math.floor(Math.random() * numberOnly.length)];
        }
    }
    else {
        option1.textContent = "Please check at least one option.";
        option2.textContent = "Please check at least one option.";
        return;
    }

    option1.textContent = password1;
    option2.textContent = password2;
}


