import { menuArray, inCart } from './data.js'

const orderBtn = document.querySelector(".orderBtn");
const payBtn = document.querySelector(".payBtn");
const paymentScreen = document.querySelector(".payment-detail");
const checkoutScreen = document.querySelector(".checkout-summary");
const completeMessage = document.querySelector(".complete-message");
const foodContainer = document.querySelector(".food-container");
const productSummary = document.querySelector(".product-summary");
const totalPriceHTML = document.querySelector(".total");
const nameInput = document.querySelector(".name");
const cardNumInput = document.querySelector(".card-number");
const CVVInput = document.querySelector(".cvv-number");
const userName = document.querySelector(".userName");


orderBtn.addEventListener("click", function () {
    paymentScreen.classList.remove("none");
})

payBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (nameInput.value.trim() === "" && cardNumInput.value.trim() === "" && CVVInput.value.trim() === "") {
        alert("Please Enter Payment Information")
    } else {
        document.querySelectorAll('button[data-selected]').forEach((btn) => {
            btn.disabled = true;
        })

        paymentScreen.classList.add("none");
        checkoutScreen.classList.add("none");
        completeMessage.classList.remove("none");
        userName.textContent = `${nameInput.value.split(" ")[0]} `;

    }
    setTimeout(resetProduct, 3000);
})


function renderMenu() {
    let menuHTML = ""
    menuArray.forEach((item) => {
        // let ingredientList = "";
        // How .join work
        // item.ingredients.forEach((ingredient, index)=>{
        //     ingredientList+= ingredient ;
        //     if(index !== ingredient.length - 1){
        //         ingredientList+= ", " ;
        //     }
        // })

        const ingredient = item.ingredients.join(", ")

        menuHTML += `
                <div class="food-cards">
                    <div class="foot-description">
                        <div class="icon">
                            <p>${item.emoji}</p>
                        </div>
                        <div class="description">
                            <p class="food">${item.name}</p>
                            <p class="ingredients">${ingredient}</p>
                            <p class="price">$${item.price}</p>
                        </div>
                    </div>
                    <button data-selected = "${item.id}">+</button>
                </div>
        `
    })
    return menuHTML;
}

function renderSummary() {
    let summaryHTML = ""
    let total = 0;
    inCart.forEach((item) => {
        if (item.amount !== 0) {
            total = item.price * item.amount;
            summaryHTML += `
            <div class="food-summary">
                    <div class="food-info">
                            <p>${item.name}</p>
                            <button data-remove = "${item.id}">remove</button>
                    </div>
                    <p>$${total}</p>
            </div>
          `
        }
    })
    return summaryHTML;
}

foodContainer.innerHTML = renderMenu()

foodContainer.addEventListener("click", function (event) {
    if (event.target.dataset.selected) {
        selectedProduct(event.target.dataset.selected)
        renderTotal();
    }
})

productSummary.addEventListener("click", function (event) {
    if (event.target.dataset.remove) {
        removeProduct(event.target.dataset.remove)
        renderTotal();
    }
})

function selectedProduct(id) {
    inCart.forEach((item) => {
        if (item.id === Number(id)) {
            item.amount++;
        }
    })
}

function removeProduct(id) {
    inCart.forEach((item) => {
        if (item.id === Number(id)) {
            item.amount--;
        }
    })
}

function calculateTotal() {
    let total = 0;
    inCart.forEach((item) => {
        total += item.amount * item.price;
    })
    return total;
}

function renderTotal() {
    if (calculateTotal() === 0) {
        checkoutScreen.classList.add("none")
    }
    else {
        checkoutScreen.classList.remove("none")
        productSummary.innerHTML = renderSummary()
        totalPriceHTML.textContent = `$${calculateTotal()}`
    }
}


function resetProduct() {
    completeMessage.classList.add("none");
    inCart.forEach((item) => {
        item.amount = 0;
    })
    document.querySelectorAll('button[data-selected]').forEach((btn) => {
        btn.disabled = false;
    })
}