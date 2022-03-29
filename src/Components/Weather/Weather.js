import axios from "axios";
import "./Weather.css";
import { useState, useEffect } from "react";



const Weather = () => {

  const [city, setCity] = useState("");
  const [search, setSearch] = useState("lahore");

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



  var current = new Date();
  var date = current.getDate();
  var monthName = months[current.getMonth()]
  var dayName = days[current.getDay()]
  var year = current.getFullYear();
  var currentTime = current.toLocaleTimeString();

  var iconurl = "http://openweathermap.org/img/w/";


  const searchBtn = () => {

    axios(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=e66647ae648e6ad4ad5398eab811dbe3`)
      .then((data) => {
        console.log('data:', data)
        setCity(data)
        console.log(city);
      })
      .catch((e) => {
        alert("Invalid City Name", e)
      })




  }


  useEffect(() => {
    searchBtn();

  }, []);




  return (
    <div className="weatherContainer" >

      {/* inputCotainer */}

      <div className="inputCotainer" >
        <input
          className="inputField"
          placeholder="Search"
          type="search"
          onChange={e => setSearch(e.target.value)}
        />
        <i onClick={searchBtn} class="fas fa-search"></i>
      </div>


      {!city ? <h1>Loading</h1> :

        <div>



          {/*tempContainer*/}

          <div className="tempContainer" >
            <h1>{Math.round(city.data.main.temp)}°C</h1>
            <h2>{city.data.weather[0].main}</h2>
          </div>

          {/* Date and Day */}

          <div className="DatenDayContainer" >
            <span>{dayName} |</span>
            <span> {monthName} {date} |</span>
            <span> {currentTime}</span>
          </div>

          <div className="imageContainer" >
            <img src={iconurl + city.data.weather[0].icon + ".png"} width="100px" />
          </div>


          {/* Location */}

          <div className=" Location" >
            <p>{city.data.name}</p>
          </div>


          {/* feelLikeContainer */}


          <div className="feelLikeContainer" >

            <div >
              <div className="circle" ><p className="circleNumber" >{Math.round(city.data.main.temp_min)}°C</p></div>
              <div className="circleText" >Min</div>
            </div>

            <div >
              <div className="circle" ><p className="circleNumber" >{Math.round(city.data.main.temp_max)}°C</p></div>
              <div className="circleText" >Max</div>
            </div>

            <div >
              <div className="circle" ><p className="circleNumber" >{city.data.main.humidity} %</p></div>
              <div className="circleText" >humidity</div>
            </div>

            <div >
              <div className="circle" ><p className="circleNumber" >{Math.round(city.data.main.feels_like)}°C</p></div>
              <div className="circleText" >Feel like</div>
            </div>
          </div>
          

        </div>
      }
    </div>
  );
};

export default Weather;
