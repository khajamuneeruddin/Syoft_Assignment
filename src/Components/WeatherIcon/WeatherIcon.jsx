import React from "react";

const WeatherIcon = ({ weatherMain }) => {
  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clouds":
        return "./clouds.png";
      case "Clear":
        return "./clear.png";
      case "Drizzle":
        return "./drizzle.png";
      case "Mist":
        return "./mist.png";
      case "Rain":
        return "./rain.png";
      case "Snow":
        return "./snow.png";
      case "Haze":
        return "./clear.png";
      default:
        return "";
    }
  };

  return (
    <img id="midImage" src={getWeatherIcon(weatherMain)} alt="weather icon" />
  );
};

export default WeatherIcon;
