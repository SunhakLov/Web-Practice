const priceHTML = document.querySelector(".price");
const investAmountHTML = document.getElementById("investment-amount")
const investBtn = document.getElementById("invest-btn")
const okaybtn = document.getElementById('okay');
const pricePurchaseHTML = document.querySelector(".price-purchase");
const goldAmountHTML = document.querySelector(".gold-amount");

const data = [];

function livePrice() {
    return (Math.random() * 100) + 3000;
}

let currentPrice = 0;

setInterval(() => {
    currentPrice = livePrice();
    priceHTML.textContent = currentPrice.toFixed(2);
}, 3000)


investBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const investAmount = parseFloat(investAmountHTML.value);
    investAmountHTML.value = ''

    let goldAmount = investAmount / currentPrice;

    pricePurchaseHTML.textContent = investAmount.toFixed(2);
    goldAmountHTML.textContent = goldAmount.toFixed(2);
    document.querySelector("dialog").showModal();

    const timestamp = Date.now();
    const date = new Date(timestamp);
    const formartTimestamp = date.toUTCString();

    await fetch('http://localhost:8000/save', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            timestamp,
            amount: investAmount.toFixed(2),
            price: currentPrice.toFixed(2)
        })
    })

    console.log(formartTimestamp);


})

okaybtn.addEventListener("click", () => {
    document.querySelector("dialog").close();
})

