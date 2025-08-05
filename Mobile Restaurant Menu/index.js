import { menuArray } from './data.js'

const orderBtn = document.querySelector(".orderBtn");
const payBtn = document.querySelector(".payBtn");
const paymentScreen = document.querySelector(".payment-detail");
const checkoutScreen = document.querySelector(".checkout-summary");
const completeMessage = document.querySelector(".complete-message");

orderBtn.addEventListener("click", function () {
    paymentScreen.classList.remove("none");
})

payBtn.addEventListener("click", function () {
    paymentScreen.classList.add("none");
    checkoutScreen.classList.add("none");
    completeMessage.classList.remove("none");
})
