import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { MdLocationOn } from "react-icons/md";

const SearchBar = ({
  city,
  setCity,
  handleSearch,
  fetchWeatherByCurrentLocation,
}) => {
  return (
    <div className="search-Bar-nav">
      <input
        className="inputbox1"
        id="inputBox"
        type="text"
        placeholder="Enter city name or zip code"
        value={city !== null ? city : ""}
        onChange={(e) => setCity(e.target.value)}
      />
      <button id="btn" className="search-icon" onClick={handleSearch}>
        <img className="searchImage" src="./search.png" alt="search icon" />
      </button>
      <button className="loctionBtn" onClick={fetchWeatherByCurrentLocation}>
        <MdLocationOn size={20} />
      </button>
      <span className="INputBoxDarkMode">
        <DarkModeSwitch sunColor={"#FFA500"} size={28} />
      </span>
    </div>
  );
};

export default SearchBar;
