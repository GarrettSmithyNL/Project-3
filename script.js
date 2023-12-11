/**
 * This is a script that fetches the properties.json file and displays the data in the console 
 * and outputs HTML. There are 4 functions that are:
 * 
 * 1. getCompleteColorRent(property) - Calculates the rent when having a complete property set and no houses.
 * 2. getDistanceFromGo(property) - Calculates the distance of a property from the Go space.
 * 3. getRentWithHousesLog(property) - Returns a log of the rent for each number of houses on a property.
 * 4. getRentWithHousesHTML(property) - Generates HTML for displaying the rent with different numbers of houses.
 * 
 * By: Garrett Smith
 * Date: Dec 21 2023
 */

// Constants
const NUM_OF_HOUSES = 4;

// Fetch the properties.json file and display the data in the console.
fetch("properties.json")
.then(response => response.json())
.then(data => {
    // creates a div element and adds it to the body of the HTML document.
    const container = document.createElement('div');
    container.innerHTML = `<h1>Monopoly Properties</h1>
        <p>This list is not including any of the utility properties.</p>`;

    // Loops through the data and displays the data in the console and outputs HTML.
    data.forEach(element => {
        // Displays the data in the console.
        story = `${element.name} is a ${element.color} property in Monopoly.\n`;
        story += `The rent when you land on that property is $${element.rent}.\n`;
        story += `Each upgrade costs $${element.buildCost}, and the rent for additional house is: \n`;
        story += getRentWithHousesLog(element);
        story += `With a hotel, the rent is $${element.rentWithHotel}.\n`;
        story += `To get a hotel, you need ${NUM_OF_HOUSES} houses on the property first.\n`;
        story += getCompleteColorRent(element) + `\n`;
        story += getDistanceFromGo(element) + `\n`;
        console.log(story);

        // Outputs the data in HTML in their own div.
        const propertyDiv = document.createElement('div');
        propertyDiv.className = 'property';
        propertyDiv.innerHTML = `
            <h2>${element.name}</h2>
            <p>The color of the property is ${element.color}.</p>
            <p>The rent when you land on that property is $${element.rent}.</p>
            <p>Each upgrade costs $${element.buildCost}, and the rent for additional house is:</p>   
            ${getRentWithHousesHTML(element)}
            <p>With a hotel, the rent is $${element.rentWithHotel}.</p>
            <p>To get a hotel, you need ${NUM_OF_HOUSES} houses on the property first.</p>
            <p>${getCompleteColorRent(element)}</p>
            <p>${getDistanceFromGo(element)}</p>
        `;
        container.appendChild(propertyDiv); 
    });
    document.body.appendChild(container);
});

/**
 * Calculates the rent when having a complete property set and no houses.
 * 
 * @param {object} property - The property object.
 * @returns {string} The rent when having a complete property set and no houses.
 */
function getCompleteColorRent(property) {
    let completeRent = property.rent * 2;
    return `The rent when having a complete property set and no houses is $${completeRent}.`;
}

/**
 * Calculates the distance of a property from the Go space.
 * @param {Object} property - The property object.
 * @returns {string} - The distance of the property from Go.
 */
function getDistanceFromGo(property) {
    let distanceFromGo = property.siteLocation - 1;
    if (distanceFromGo === 1) {
        return `${property.name} is ${distanceFromGo} space from Go.`;
    }
    else{
        return `${property.name} is ${distanceFromGo} spaces from Go.`;
    }
}

/**
 * Returns a log of the rent for each number of houses on a property.
 * @param {Object} property - The property object.
 * @returns {string} - The log of the rent for each number of houses.
 */
function getRentWithHousesLog(property) {
    let story = ``
    for (let i = 0; i < NUM_OF_HOUSES; i++) {
        story += `With ${i + 1} houses, the rent is $${property.rentWithHouses[i]}. \n`;
    }
    return story;
}

/**
 * Generates HTML for displaying the rent with different numbers of houses.
 * @param {object} property - The property object.
 * @returns {string} - The HTML string representing the rent with houses.
 */
function getRentWithHousesHTML(property) {
    let story = `<ul>`
    for (let i = 0; i < NUM_OF_HOUSES; i++) {
        story += `<li>With ${i + 1} houses, the rent is $${property.rentWithHouses[i]}.</li>`;
    }
    story += `</ul>`
    return story;
}