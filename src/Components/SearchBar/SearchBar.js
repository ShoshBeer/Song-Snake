import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({ term: '' });
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }
    
    search() {
        this.props.onSearch(this.state.term);
    }

    handleEnter(e) {
        if (e.keyCode == 13) return this.search();
    }

    handleTermChange(e) {
        this.setState({ term: e.target.value });
    }
    
    render() {
        return (
            <div className="SearchBar">
                <input onKeyUp={this.handleEnter} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
                <button onClick={this.search} className="SearchButton">SEARCH</button>
            </div>
        )
    }
}