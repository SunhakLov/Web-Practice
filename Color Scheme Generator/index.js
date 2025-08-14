const colorDiv = document.querySelector(".colorDiv");
const colorPicker = document.querySelector(".color-picker");
const schemeSelector = document.querySelector(".scheme-selector");
const submitBtn = document.querySelector(".submitBtn");
let arrayColor = ["#C01010", "#ED1515", "#F24444", "#F67373", "#F9A2A2"];

renderColor();

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const hexValue = colorPicker.value.slice(1, 7).toUpperCase()
    const schemeValue = schemeSelector.value.toLowerCase()
    arrayColor = [];
    fetchData(hexValue, schemeValue);
})

function fetchData(hex, mode) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`, { method: "GET" }).then(response => response.json()).then(data => {
        data.colors.forEach(color => {
            arrayColor.push(color.hex.value);
        });

        console.log(arrayColor)
        renderColor();
    })
}

function renderColor() {
    let htmlColor = ""

    arrayColor.forEach(color => {
        htmlColor += ` 
        <div class="color-container" data-colors="${color}">
                <div class="color" style="background-color:${color}"></div>
                <p class="color-hex">${color}</p>
        </div>
        `
    })
    document.querySelector(".colorDiv").innerHTML = htmlColor;
    console.log("Done loading color !")
}

colorDiv.addEventListener("click", (e) => {
    const card = e.target.closest(".color-container");
    if (!card) return;

    const hex = card.dataset.colors;
    navigator.clipboard.writeText(hex);

    const lable = card.querySelector(`.color-hex`);
    lable.textContent = "Copied";
    setTimeout(() => { lable.textContent = `${hex}`; }, 900)
})

