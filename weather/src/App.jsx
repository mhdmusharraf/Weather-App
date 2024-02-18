import React from "react";
import "./App.css";
import PropTypes from "prop-types";

import searchIcon from "./assets/searchIcon.png";
import rainIcon from "./assets/rain.png";
import humidityIcon from "./assets/humidity.png";
import windIcon from "./assets/wind.png";
import clearIcon from "./assets/01d.png";
import { useState, useEffect } from "react";

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

WeatherDetails.propTypes={
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  lat:PropTypes.number.isRequired,
  lon:PropTypes.number.isRequired,
  humidity:PropTypes.number.isRequired,
}

function App() {
  let api_key = "3e300226fbc4166b4406944649456fcd";
  const [text, setText] = useState("LONDON");
  const [icon, setIcon] = useState(clearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("London");
  const [country, setCountry] = useState("GB");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const weatherIconMap = {
  //   "01d": "https://img.icons8.com/ios/452/sun--v1.png",
  //   "02d": "https://img.icons8.com/ios/452/partly-cloudy-day--v1.png",
  //   "03d": rainIcon,
  //   "04d": rainIcon,
  //   "03n": "https://img.icons8.com/color/48/000000/clouds.png",
  //   "04n": cloudSnowIcon,
  //   "09d": rainIcon,
  //   "10d": rainIcon,
  //   "10n": rainIcon,
  //   "11d": rainIcon,
  //   "11n": lightningBoltIcon,
  //   "13d": snowFlakeIcon,
  //   "13n": snowFlakeIcon,
  //   "50d": cloudDrizzleIcon,
  //   "50n": cloudDrizzleIcon,
  // };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      //console.log(data);
      if (data.cod === "404") {
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    } catch (error) {
      console.error("An error occured: ", error.message);
      setError("An error occured while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(function () {
    search();
  }, []);
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search City"
            onChange={handleCity}
            onKeyDown={handleKeyDown}
            value={text}
          />
          <div className="search-icon" onClick={() => search()}>
            <img src={searchIcon} alt="Search" className="search" />
          </div>
        </div>
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City not found</div>}
        
          {!loading&& !cityNotFound&&<WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            lon={lon}
            humidity={humidity}
            wind={wind}
          />}
        

        <p className="copyright">
          Designed by <span>Musharraf</span>
        </p>
      </div>
    </>
  );
}

export default App;
