'use strict';
// UTILITY FUNCTIONS
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

const resultContainer = select('.result-container');

const fetchRaM = () => {
    const promises = [];
    for (let i = 1; i <= 16; i++) {
        const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const j = randomNum(1, 250);
        const url = `https://rickandmortyapi.com/api/character/${j}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((result) => {
            const data = result.map((results) => ({
            name: results.name,
            image: results.image,
            status: results.status,
            gender: results.gender,
            species:results.species,
            location:results.location.name,
        }));

        displayRaM(data);
        changeColor(data)
    });

};
/*
function changeColor(data) {
    if(data.status === 'Alive') {
        //color.style.backgroundColor = '#55cc44';
        color.style.cssText = 'background-color:#55cc44;'

    } else if(data.status === 'Dead') {
        //color.style.backgroundColor = '#d63d2e';
        color.style.cssText = 'background-color:#d63d2e;'

    } else {
        //color.style.backgroundColor = '#9e9e9e';
        color.style.cssText = 'background-color:#9e9e9e;'
    }
}
*/
const displayRaM = (data) => {
    const RaMData = data
        .map(
            (RaM) => `
        <div class="card">
            <figure>
                <img src="${RaM.image}" alt="" class="RaM-img">
            </figure>
            <div>
            <h3 class="RaM-name">${String(RaM.name).padStart(3, '0')}</h3>
            <p class="RaM-gender">
                <span class="gender">gender: </span>
                <span>${RaM.gender}</span>
            </p>
            <ul>
                <li>
                    <span class="life"></span>
                    ${RaM.status} - ${RaM.species}
                </li>
                <li>
                    <div class="location">Last known location</div>
                    ${RaM.location}
                </li>
            </ul>
            </div>
        </div>
    `
        ).join('');
    resultContainer.innerHTML = RaMData;
};

fetchRaM();
