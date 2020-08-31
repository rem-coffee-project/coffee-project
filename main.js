"use strict"

function renderCoffee(coffee) {
    // var html = '<div class="coffee d-flex justify-content-center align-items-center col-lg-6 col-sm-12">';
    //TODO Maybe suggest coffee based on button click
    var html = '<button type="button" class="coffee btn btn-outline-dark d-flex justify-content-center align-items-center col-lg-6 col-sm-12">';
    html += '<h4>' + coffee.name + '</h4> ';
    html += '<p id="roastText">(' + coffee.roast + ')</p>';
    html += '</button>';

    return html;
}

function renderCoffeeList(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    if(selectedRoast === "All"){
        tbody.innerHTML = renderCoffeeList(coffees)
    }else {
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
        tbody.innerHTML = renderCoffeeList(filteredCoffees)
        })
    }
}

function validateSubmission(e){
    e.preventDefault();
    var submittedRoast = newCoffeeRoastLevel.value;
    var submittedName = newCoffeeName.value.toLowerCase();
    var redundancyCheck = [];

    //Check for empty string submission
    while (submittedName === " " || submittedName === '') {
        let name = prompt("Looks like you haven't given this new brew a name. What would you like to call it?");
        submittedName = name;
    }
    //Check for pre-existing name and roast combination
    //Narrow current coffee list down to submitted roast
    coffees.forEach(function(coffee) {
        if (coffee.roast === submittedRoast) {
            redundancyCheck.push(coffee.name.toLowerCase());
        }
    })
    console.log(redundancyCheck);
    //Check for name match in the truncated list of coffees
    let checkName = redundancyCheck.includes(submittedName)
    if(checkName){
        alert("Looks like we already have that combination of coffee and roast level in our inventory.\nPerhaps you'd like to give your brew a different name and resubmit?")
    }else{
        addNewCoffee(submittedRoast, submittedName);
    }
}

function addNewCoffee(roast, blend){
    console.log("Roast: " + roast + " Blend: " + blend);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var newCoffeeSubmission = document.getElementById('newCoffeeRequest');

tbody.innerHTML = renderCoffeeList(coffees);

submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('input', updateCoffees);
newCoffeeSubmission.addEventListener('click', validateSubmission);