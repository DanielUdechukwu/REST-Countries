let wrapper = document.querySelector('.wrapper'),
selectbtn = document.querySelector('#dropdown'),
list = document.querySelector('.list');
let options = document.querySelector('.options');
let cardContainer = document.querySelector('.card-container');
let regionSelect;
let countryName, population, region, capital, flag;
let inputField = document.querySelector('#inputField');
let timer;
let waitTime = 1000;
let messageInput = document.getElementById('inputField');
let darkMode = document.querySelector(".dark-mode");
let header = document.querySelector('.main'),
body = document.querySelector('.body'),
card = document.querySelector('.card'),
search = document.querySelector('.search')

const clear = () => {
  inputField.value = " ";
}

clear();

const showOnLoad = () => {
  fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach(x => {
      // console.log(x.name.official)
      countryName = x.name.common
      capital = x.capital
      region = x.region
      population = x.population
      flag = x.flags.png

      cardContainer.innerHTML += `
        <div class="card">
        <div class="flag">
          <img src=${flag} alt="" class="">
        </div>
        <div class="details">
          <p class="country">${countryName}</p>
          <p class="population">Population: <span class="">${population}</span></p>
          <p class="region">Region: <span class="">${region}</span></p>
          <p class="capital">Capital: <span class="">${capital}</span></p>
        </div>
      </div>`
    })
  })
}

showOnLoad();

selectbtn.addEventListener('click', () => {
  list.classList.toggle('active')
})

let countries = ["africa", "america","asia", "europe", "oceania"];

const setCountry = () => {
  countries.forEach(country => {
    let li = `<li onclick="updateCountry(this)" class="list-item">${country}</li>`;
    options.insertAdjacentHTML('beforeend', li);
  });
}

setCountry();

const updateCountry = (selectedCountry) => {
  list.classList.remove('active')
  regionSelect = selectbtn.firstElementChild.innerText = selectedCountry.innerText;
  console.log(regionSelect)
  cardContainer.innerHTML = ` `;
  fetch(`https://restcountries.com/v3.1/region/${regionSelect}`)
  .then((response) => response.json())
  .then((data) => {
    data.forEach(x => {
      // console.log(x.name.official)
      countryName = x.name.common
      capital = x.capital
      region = x.region
      population = x.population
      flag = x.flags.png

      cardContainer.innerHTML += `
        <div class="card darkk">
        <div class="flag">
          <img src=${flag} alt="" class="">
        </div>
        <div class="details">
          <p class="country">${countryName}</p>
          <p class="population">Population: <span class="">${population}</span></p>
          <p class="region">Region: <span class="">${region}</span></p>
          <p class="capital">Capital: <span class="">${capital}</span></p>
        </div>
      </div>`
    })
  })
}

messageInput.addEventListener('keyup', event => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    doneTyping(event.target.value);
  }, waitTime);
});

function doneTyping(value) {
  console.log(`The user is done typing: ${value}`);
  cardContainer.innerHTML = ` `;
  fetch(`https://restcountries.com/v3.1/name/${value}`)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data[0].name.official)
    // console.log(countryName, capital, region, population)
    countryName = data[0].name.common
    capital = data[0].capital
    region = data[0].region
    population = data[0].population
    flag = data[0].flags.png

    cardContainer.innerHTML += `
      <div class="card darkk">
      <div class="flag">
        <img src=${flag} alt="" class="">
      </div>
      <div class="details">
        <p class="country">${countryName}</p>
        <p class="population">Population: <span class="">${population}</span></p>
        <p class="region">Region: <span class="">${region}</span></p>
        <p class="capital">Capital: <span class="">${capital}</span></p>
      </div>
    </div>`
  })
}


// Dark mode

darkMode.addEventListener('click', () => {
  header.classList.toggle('darkk')
  body.classList.toggle('dark-main')
  search.classList.toggle('darkk')
  selectbtn.classList.toggle('darkk')
  card.classList.toggle('darkk')
})