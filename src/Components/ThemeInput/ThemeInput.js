import React from "react";
import './ThemeInput.css';

export function ThemeInput({ theme, setTheme }) {

  const handleInputChange = (e) => {
    setTheme(e.target.value);
  }

  const handleSubmit = (e) => {
    if (e.key === "Enter" || !e.key) {
      setTheme("Butt");
    }
  }

  return (
    <div className="ThemeInput">
      <input 
        id='themeInput' 
        placeholder="Enter A Theme" 
        autoComplete='off'
        value={theme}
        onChange={handleInputChange}
        onKeyUp={handleSubmit}
        />
      <button
        className="SearchButton"
        onClick={handleSubmit}>Search</button>
    </div>
  )
}