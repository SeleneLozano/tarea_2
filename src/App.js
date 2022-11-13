import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
const [weather, setWeather] = useState({});
const [isFarenheit, setIsFarenheit] = useState(true);
const degree = weather.main?.temp;
   useEffect (()=>{
    const success = pos =>{
    const lon = pos.coords.longitude
    const lat = pos.coords.latitude
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=48768b37358c684213f7320cd846fd98`)
      .then(res=> setWeather(res.data));
     }
      navigator.geolocation.getCurrentPosition(success);
    },[]);

    const colors = [
      "#B9ECCF",
      "#91CABC",
      "#CFFBE2",
      "#D9EDDF"
    ];
    const randomColor = Math.floor(Math.random() * colors.length);
    document.body.style = `background: ${colors[randomColor]}`;
  
  
  return (
    <div className="App" >
    <div className="card">
      <h2>Weather App</h2>
      <h3>{weather.name} , {weather.sys?.country}</h3>
      <b> {weather.weather?.[0].description}</b>
      <p> <b>Wind Speed :</b> {weather.wind?.speed} m/s</p>
      <p> <b>Pressure :</b> {weather.main?.pressure}  hPa</p>
      <p> <b>Humidity :</b> {weather.main?.humidity}  %</p>
      <p>
    <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="description of weather"></img>
          <b>Degrees :</b> {isFarenheit ? ((degree - 273.15) *(9/5)+32).toFixed(2) : (degree - 273.15).toFixed(2)} {" "}
          {isFarenheit ? "°F" : "°C"}
      </p>
      <button onClick={() => setIsFarenheit(!isFarenheit)}>
          Degrees
        </button>
    </div>
    </div>
  );
}

export default App;