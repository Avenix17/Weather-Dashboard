let userSearch = '';
let searchHistory = [];
let uvIndex = document.getElementById('uv-index');
let cityList = document.getElementById('city-list');
let weatherReport = document.getElementById('right-side');

const apiKey = 'dbd9945d1be754046de38d9129ecdf22';

document.getElementById('search-button').addEventListener('click', userInputComplete);

// Clickable history
$('#city-list').on('click', (e) => {
    $('#validationCustom03').val(e.target.innerText);
    userSearch = e.target.innerText;
    console.log(e.target);
    callOpenWeather();
});

function userInputComplete(e) {
    e.preventDefault();
    userSearch = document.getElementById('validationCustom03').value;
    userSearch = userSearch.trim();
    saveSearchHistory();
    callOpenWeather();
};

//Initial call
async function callOpenWeather() {
    const WeatherData = saveSearchHistory(userSearch)
    if (WeatherData) {
        updateSearch(WeatherData);
    } else {
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + userSearch + '&appid=' + apiKey + '&units=imperial';
        fetch(url)
            .then(function (response) {
                response.json().then(function (data) {
                    let cityName = data.name;
                    let long = data.coord.lon;
                    let lat = data.coord.lat;
                    forecastData(cityName, long, lat);
                });
            });
    }
};

//Forecast call
async function forecastData(cityName, long, lat) {
    let forcastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=imperial&appid=' + apiKey;

    const result = await fetch(forcastUrl)
        .then(response => response.json())
        .then(function (response) {
            updateSearch(cityName, response);
        });
};

function updateSearch(cityName, displayData) {

    //Removes hidden class on forecast
    weatherReport.classList.remove('hidden');

    //Current Date
    $('#city').text(cityName);
    $('#date').text(moment.unix(displayData.current.dt).format('MM/DD/YYYY'));
    $('#temp').text('Temp: ' + displayData.current.temp + '°F');
    $('#current-weather-pic').attr('src', 'https://openweathermap.org/img/wn/' + displayData.current.weather[0].icon + '.png');
    $('#wind').text('Wind: ' + displayData.current.wind_speed + 'mph');
    $('#humidity').text('Humidity: ' + displayData.current.humidity + '%');
    $('#uv-index').text('UV Index: ' + displayData.current.uvi);

    if (displayData.current.uvi <= 4) {
        uvIndex.classList.add('favorable');
    } else if (displayData.current.uvi > 4 && displayData.current.uvi <= 6) {
        uvIndex.classList.add('moderate');
    } else {
        uvIndex.classList.add('severe');
    }

    //Day 1
    $('#date-1').text(moment.unix(displayData.daily[1].dt).format('MM/DD/YYYY'));
    $('#weather-pic-1').attr('src', "https://openweathermap.org/img/wn/" + displayData.daily[1].weather[0].icon + ".png");
    $('#temp-1').text('Temp: ' + displayData.daily[1].temp.day + '°F');
    $('#wind-1').text('Wind: ' + displayData.daily[1].wind_speed + 'mph');
    $('#humidity-1').text('Humidity: ' + displayData.daily[1].humidity + '%');

    //Day 2
    $('#date-2').text(moment.unix(displayData.daily[2].dt).format('MM/DD/YYYY'));
    $('#weather-pic-2').attr('src', "https://openweathermap.org/img/wn/" + displayData.daily[2].weather[0].icon + ".png");
    $('#temp-2').text('Temp: ' + displayData.daily[2].temp.day + '°F');
    $('#wind-2').text('Wind: ' + displayData.daily[2].wind_speed + 'mph');
    $('#humidity-2').text('Humidity: ' + displayData.daily[2].humidity + '%');

    //Day 3
    $('#date-3').text(moment.unix(displayData.daily[3].dt).format('MM/DD/YYYY'));
    $('#weather-pic-3').attr('src', "https://openweathermap.org/img/wn/" + displayData.daily[3].weather[0].icon + ".png");
    $('#temp-3').text('Temp: ' + displayData.daily[3].temp.day + '°F');
    $('#wind-3').text('Wind: ' + displayData.daily[3].wind_speed + 'mph');
    $('#humidity-3').text('Humidity: ' + displayData.daily[3].humidity + '%');

    //Day 4
    $('#date-4').text(moment.unix(displayData.daily[4].dt).format('MM/DD/YYYY'));
    $('#weather-pic-4').attr('src', "https://openweathermap.org/img/wn/" + displayData.daily[4].weather[0].icon + ".png");
    $('#temp-4').text('Temp: ' + displayData.daily[4].temp.day + '°F');
    $('#wind-4').text('Wind: ' + displayData.daily[4].wind_speed + 'mph');
    $('#humidity-4').text('Humidity: ' + displayData.daily[4].humidity + '%');

    //Day 5
    $('#date-5').text(moment.unix(displayData.daily[5].dt).format('MM/DD/YYYY'));
    $('#weather-pic-5').attr('src', "https://openweathermap.org/img/wn/" + displayData.daily[5].weather[0].icon + ".png");
    $('#temp-5').text('Temp: ' + displayData.daily[5].temp.day + '°F');
    $('#wind-5').text('Wind: ' + displayData.daily[5].wind_speed + 'mph');
    $('#humidity-5').text('Humidity: ' + displayData.daily[5].humidity + '%');
};

//Saves search history
function saveSearchHistory() {

    console.log('starting savesearchhistory');

    if (localStorage["searchHistory"]) {
        searchHistory = JSON.parse(localStorage['searchHistory']);
        console.log(searchHistory);
    }
    if (searchHistory.indexOf(validationCustom03.value) == -1) {
        searchHistory.unshift(userSearch);
        if (searchHistory.length > 10) {
            searchHistory.pop();
        }
        localStorage['searchHistory'] = JSON.stringify(searchHistory);
    }


    cityList.innerHTML = searchHistory
        .map(userSearch => {
            return `<li class="search-results"><a>${userSearch}</a><li>`;
        })
        .join("");
};

//Shows history without creating new search
searchHistory = JSON.parse(localStorage['searchHistory']);
cityList.innerHTML = searchHistory
    .map(userSearch => {
        return `<li class="search-results" href="#"><a>${userSearch}</a><li>`;
    })
    .join("");