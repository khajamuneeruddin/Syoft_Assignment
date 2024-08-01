import React from "react";
import { IoMdTime } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

import WeatherIcon from "../WeatherIcon/WeatherIcon";

const WeatherDetails = ({ weatherData, currentLocation, dateTime }) => {
  if (!weatherData || !dateTime) {
    return null;
  }
  return (
    <div className="Details-Container">
      <div className="boxAppContainer">
        <WeatherIcon weatherMain={weatherData.weather[0].main} />
        <div id="midTextTag" className="text-center">
          <h1 className="headingTag">
            {Math.round(weatherData.main.temp - 273.15)}°c
          </h1>
          <p id="changeCity">{weatherData.name}</p>
        </div>
        <div id="footer-box1" className="footor-Box">
          <div className="footor-innerBox">
            <img
              className="humidityImage"
              src="./humidity.png"
              alt="humidity icon"
            />
            <div>
              <p id="footor-box-humidity1">{weatherData.main.humidity}%</p>
              <span id="footor-box-humidity-name1">Humidity</span>
            </div>
          </div>
          <div className="footor-innerBox">
            <img className="windImage" src="./wind.png" alt="wind speed icon" />
            <div style={{ textAlign: "left" }}>
              <p id="footor-box-humidity2">{weatherData.wind.speed} km/h</p>
              <span id="footor-box-humidity-name2">Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
      <div className="leftBox">
        <div className="leftBoxDiv">
          <MdLocationOn fill={"red"} size={20} />
          <p>{currentLocation}</p>
        </div>
        <div className="leftBoxDiv">
          <SlCalender fill={"red"} size={20} />
          <p>{`${dateTime.dayOfWeek} ${dateTime.month} ${dateTime.day} ${dateTime.year}`}</p>
        </div>
        <div className="leftBoxDiv">
          <IoMdTime fill={"red"} size={20} />
          <p>{`${dateTime.formattedTime}`}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
