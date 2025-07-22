const inputValue = document.getElementById("value") ;
const convertBtn = document.getElementById("convert") ;

const lenghtEl = document.getElementById("Length") ;
const volumeEl = document.getElementById("Volume") ;
const massEl = document.getElementById("Mass") ;

/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

convertBtn.addEventListener("click", function (event){
    event.preventDefault() ;

    const value = inputValue.value ;
    
    let meterToFeet = (value * 3.281).toFixed(3) ;
    let feetToMeter = (value / 3.281).toFixed(3) ;

    let literToGallon = (value * 0.264).toFixed(3) ;
    let gallonToLiter = (value / 0.264).toFixed(3) ;

    let kiloToPound = (value * 2.204).toFixed(3) ;
    let poundToKilo = (value / 2.204).toFixed(3) ;

    lenghtEl.innerHTML = `<p> ${value} meters = ${meterToFeet} feets | ${value} feets = ${feetToMeter} meters</p>`
    volumeEl.innerHTML = `<p> ${value} liters = ${literToGallon} gallons | ${value} gallons = ${gallonToLiter} liters</p>`
    massEl.innerHTML = `<p> ${value} kilos = ${kiloToPound} pounds | ${value} pounds = ${poundToKilo} kilos</p>`
})
