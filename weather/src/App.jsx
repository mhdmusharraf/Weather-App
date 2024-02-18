import React from "react";
import "./App.css";

import searchIcon from "./assets/searchIcon.png";
import rainIcon from "./assets/rain.png";
import humidityIcon from "./assets/humidity.png";
import windIcon from "./assets/wind.png";
import { useState } from "react";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  lon,
  humidity,
  wind,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="lon">Longitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  let api_key = "3e300226fbc4166b4406944649456fcd";
  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState(rainIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("INDIA");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=${api_key}&units=Metric`;
  };
  const handleCity = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search City"
            onChange={handleCity}
            value={text}
          />
          <div className="search-icon">
            <img src={searchIcon} alt="Search" className="search" />
          </div>
        </div>
        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          lon={lon}
          humidity={humidity}
          wind={wind}
        />
        <p className="copyright">
          Designed by <span>Musharraf</span>
        </p>
      </div>
    </>
  );
}

export default App;
