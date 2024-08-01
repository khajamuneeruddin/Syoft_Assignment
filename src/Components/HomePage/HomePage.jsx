import React, { useState, useEffect } from "react";

import MultipleLocations from "../TabsComponent/MultipleLocations";
import "./HomePage.css";


import SearchBar from "../SearchBar/SearchBar";
import WeatherDetails from "../WeatherDetails/WeatherDetails";

const HomePage = () => {
  
  
  const [city, setCity] = useState(null);
  const [currentLocation, setcurrentLoction] = useState();
  const [dT, setDt] = useState();
  const [dateTime, setDateTime] = useState();
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const convertEpochToDate = (epochTime) => {
    const date = new Date(epochTime * 1000);

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];

    const day = date.getDate().toString().padStart(2, "0");

    const year = date.getFullYear();

    let hours = date.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes} ${period}`;

    return { dayOfWeek, month, day, year, formattedTime };
  };

  const fetchWeatherData = async (query) => {
    const apiKey = "710a400e3c91590fc9641960ecb5b5a3";
    const url = isNaN(query)
      ? `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`
      : `https://api.openweathermap.org/data/2.5/weather?zip=${query},in&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);

      setErrorMessage("");
      setCity("");
    } catch (error) {
      setWeatherData(null);
      setErrorMessage("Something went wrong. Check the city name or zip code.");
    }
  };

  const handleSearch = () => {
    if (!city) {
      setErrorMessage("Please enter a city name or zip code");
      return;
    }
    fetchWeatherData(city);
  };

  const fetchWeatherByCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const apiKey = "710a400e3c91590fc9641960ecb5b5a3";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setWeatherData(data);
            setcurrentLoction(data.name);
            setDt(data.dt);
            setErrorMessage("");
            setCity("");
          } catch (error) {
            setWeatherData(null);
            setErrorMessage(
              "Failed to fetch weather for your current location."
            );
          }
        },
        (error) => {
          console.error("Error getting current position:", error);
          setErrorMessage("Failed to get your current location.");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchWeatherByCurrentLocation();
      console.log(dT);
      if (dT !== undefined) {
        setDateTime(convertEpochToDate(dT));
      }
    };

    fetchData();
  }, [dT]);

  return (
    <div className="mainTag">
      
      <div className={`app-box ${"bg"}`}>
        <MultipleLocations
          fetchWeatherData={fetchWeatherData}
          weatherData={weatherData}
        />
        <SearchBar
          fetchWeatherByCurrentLocation={fetchWeatherByCurrentLocation}
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}
        />

        {errorMessage && <h1 id="headingTag">{errorMessage}</h1>}
        {weatherData && (
          <WeatherDetails
            currentLocation={currentLocation}
            weatherData={weatherData}
            dateTime={dateTime}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
