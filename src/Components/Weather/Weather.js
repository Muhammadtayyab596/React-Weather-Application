import axios from "axios";
import "./Weather.css";
import { useState, useEffect } from "react";

const Weather = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("karachi");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=c4307c6a631f28236d48d91a20a41807`;
      const response = await fetch(url);
      const resj = await response.json();
      console.log(resj);
      // .then((data) => {
      //     console.log(data);
      // })
      // .catch((err) => {
      //     console.error(err);
      // });
      setCity(resj.main);
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <div className="main">
        <h1>Weather App</h1>
        <div className="inputData">
          <input
            type="search"
            className="inputField"
            placeholder="Enter a City name"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        {!city ? (
          <h2> No Data Found</h2>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                <i className="fas fa-map-marker-alt"></i>
                {search}
              </h2>
              <h1 className="temp">{city.temp}°C</h1>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
                }}
              >
                <div>
                  <div className="subdiv">
                    <p>{city.temp_min}°C </p>
                  </div>
                  <p className="bold">Min</p>
                </div>
                <div>
                  <div className="subdiv">
                    <p>{city.temp_max}°C</p>
                  </div>
                  <p className="bold">Max</p>
                </div>
                <div>
                  <div className="subdiv">
                    <p>{city.humidity}%</p>
                  </div>
                  <p className="bold">humidity</p>
                </div>
                <div>
                  <div className="subdiv">
                    <p>{city.feels_like}°C</p>
                  </div>
                  <p className="bold">feels_like</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Weather;
