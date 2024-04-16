import React from 'react';
import './Search.css';

const Search = () => {
    return (
        <div class="container">
        <h2> Search for a song</h2>
            <div id='select-track'>
              <div id="search-div">
                <div id='search-form'>
                    Search for a track: <input id="search" type="text" class="input-large search-query" title="search"/>
                    <button id="go-search" class='btn btn-default'> Search </button>
                </div>
              </div>
            </div>
        </div>
            
    )
}

export default Search
