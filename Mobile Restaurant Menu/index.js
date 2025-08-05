import { menuArray } from './data.js'

const orderBtn = document.querySelector(".orderBtn");
const payBtn = document.querySelector(".payBtn");
const paymentScreen = document.querySelector(".payment-detail");


orderBtn.addEventListener("click", function () {
    paymentScreen.classList.remove("none");
})

payBtn.addEventListener("click", function () {
    paymentScreen.classList.add("none");
})

``