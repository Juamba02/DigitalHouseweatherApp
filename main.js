// URL y API KEY de la API que utilizo para mi web.
let url = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "API_KEY";
const diffKelvin = 273.15;

// Div en el que mostrare la informacion obtenida
const responseData = document.querySelector("#responseData");

// Funcion para obtener la ciudad introducida en el input de la web
const searchCity = () => {
  const cityInput = document.querySelector("#cityInput").value;
  responseData.innerHTML = '';
  if (cityInput) {
    fetchWeather(cityInput);
  } else {
    const errorIcon = document.createElement('span');
    const errorText = document.createElement('p');

    errorIcon.textContent = 'error';
    errorIcon.classList.add('material-symbols-outlined');

    errorText.textContent = 'Debes ingresar una ciudad válida';
    errorText.classList.add('error');

    responseData.appendChild(errorIcon);
    responseData.appendChild(errorText);
    responseData.classList.remove('responseData');
    responseData.classList.add('responseDataError');
    return;
  }
};

// Funcion que llama a la API
const fetchWeather = async (city) => {
  try {
    const apiCall = await fetch(`${url}?q=${city}&appid=${API_KEY}&lang=es`);
    const data = await apiCall.json();
    
    if (data.cod === '404') {
      throw new Error('Ciudad no encontrada');
    }
    
    showWeatherData(data);
  } catch (error) {
    responseData.innerHTML = '';
    const errorIcon = document.createElement('span');
    const errorText = document.createElement('p');

    errorIcon.textContent = 'error';
    errorIcon.classList.add('material-symbols-outlined');

    errorText.textContent = error.message || 'Error al obtener los datos del clima';
    errorText.classList.add('error');

    responseData.appendChild(errorIcon);
    responseData.appendChild(errorText);
    responseData.classList.remove('responseData');
    responseData.classList.add('responseDataError');
  }
};

// Funcion que muestra los datos obtenidos de la llamada a la API en la web
const showWeatherData = (data) => {
    responseData.innerHTML = '';
    const cityName = data.name;
    const countryName = data.sys.country;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;

    const cityInfo = document.createElement('h2');
    cityInfo.textContent = `${cityName}, ${countryName}`;

    const tempInfo = document.createElement('p');
    tempInfo.textContent = `La temperatura actual es: ${Math.floor(temp - diffKelvin)}°C`;

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `La humedad es del ${humidity}%`;

    const iconInfo = document.createElement('img');
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const descInfo = document.createElement('p');
    descInfo.textContent = `La descripción meteorológica es ${desc}`;

    responseData.appendChild(cityInfo);
    responseData.appendChild(tempInfo);
    responseData.appendChild(humidityInfo);
    responseData.appendChild(iconInfo);
    responseData.appendChild(descInfo);

    responseData.classList.remove('responseDataError');
    responseData.classList.add('responseData');
};

const searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", searchCity);
