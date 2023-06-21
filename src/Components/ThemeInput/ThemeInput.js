import React from "react";
import './ThemeInput.css';

export function ThemeInput({ setTheme, setThemeInput, themeInput }) {

  const handleInputChange = (e) => {
    setThemeInput(e.target.value);
  }

  const handleSubmit = (e) => {
    if (e.key === "Enter" || !e.key) {
      setTheme(themeInput);
    }
  }

  return (
    <div className="ThemeInput">
      <input 
        id='themeInput' 
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