import React, { useEffect, useState } from 'react';
import './SearchBar.css';

export function SearchBar(props) {
    const [term, setTerm] = useState('initial state');

    const search = (searchTerm) => {
        return props.onSearch(searchTerm);
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            return search(term);
        }
    }

    const handleTermChange = (e) => {
        setTerm(e.target.value);
        console.log(term);
    }

    //this allows the initial search before authentication to automatically run after the redirect
    let firstSearch;
    useEffect(() => {
        let url = window.location.href;
        firstSearch = window.localStorage.getItem('termForRedirect')
        if (url.match(/access_token=([^&]*)/) && firstSearch) {
            document.getElementById('input').value = firstSearch;
            window.localStorage.removeItem('termForRedirect');
            search(firstSearch);
        }; 
    }, []);
    
    return (
        <div className="SearchBar">
            <input 
            id='input' 
            onKeyUp={handleEnter} 
            onChange={handleTermChange} 
            placeholder="Enter A Song, Album, or Artist" 
            autoComplete='off' />
            <button onClick={search} className="SearchButton">SEARCH</button>
        </div>
    )
}