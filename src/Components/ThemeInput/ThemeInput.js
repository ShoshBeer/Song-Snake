import React from "react";
import './ThemeInput.css';

export function ThemeInput({ setTheme, setThemeInput, themeInput, themeSearch, getAccessToken }) {

  const handleInputChange = (e) => {
    setThemeInput(e.target.value);
  }

  const handleSubmit = (e) => {
    if (e.key === "Enter" || !e.key) {
      setTheme(themeInput);
      themeSearch(themeInput);
    }
  }

  return (
    <div className="ThemeInput">
      <input 
        id='themeInput' 
        onFocus={getAccessToken}
        placeholder="Enter A Theme" 
        autoComplete='off'
        value={themeInput}
        onChange={handleInputChange}
        onKeyUp={handleSubmit}
        />
      <button
        className="SearchButton"
        onClick={handleSubmit}>Search</button>
    </div>
  )
}