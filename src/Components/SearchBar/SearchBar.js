import React, { useEffect } from 'react';
import './SearchBar.css';

export function SearchBar(props) {

    const search = (searchTerm) => {
        return props.onSearch(searchTerm);
    }

    const handleSubmit = () => {
        props.setTerm(props.inputValue);
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            props.setTerm(props.inputValue);
        }
    }

    const handleInputChange = (e) => {
        props.setInputValue(e.target.value);
    }

    //this allows the initial search before authentication to automatically run after the redirect
    useEffect(() => {
        let url = window.location.href;
        const firstSearch = window.localStorage.getItem('termForRedirect')
        if (url.match(/access_token=([^&]*)/) && firstSearch) {
            props.setInputValue(firstSearch);
            window.localStorage.removeItem('termForRedirect');
            props.setTerm(firstSearch);
        }; 
    }, []);

    useEffect(() => {
        if (!props.term) {
            return;
        }
        search(props.term);
    }, [props.term])
    
    return (
        <div className="SearchBar">
            <input 
              id='input' 
              onKeyUp={handleEnter} 
              onChange={handleInputChange} 
              placeholder="Enter A Song, Album, or Artist" 
              autoComplete='off'
              value={props.inputValue} />
            <button onClick={handleSubmit} className="SearchButton">Search</button>
        </div>
    )
}