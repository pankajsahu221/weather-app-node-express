var fetchWeather = '/weather';

const weatherForm = document.querySelector('form');
const searchInp = document.querySelector('input');
const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

dateElement.textContent = new Date().getDate() + " " + monthNames[new Date().getMonth()].substring(0, 3);


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(searchInp.value);
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";

    const locationAp = fetchWeather + '?address=' + searchInp.value ;

    fetch(locationAp)
       .then(response => {
           response.json().then(data => {
               console.log(data);
               if(data.error){
                    locationElement.textContent = data.error;
                    tempElement.textContent = "";
                    weatherCondition.textContent = "";
               }
               else{
                    locationElement.textContent = data.cityName;
                    tempElement.textContent = (data.temp - 273.5).toFixed(2) + String.fromCharCode(176);
                    weatherCondition.textContent = data.desc;
               }
           })    
       })
})