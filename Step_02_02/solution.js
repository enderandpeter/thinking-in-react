import React from 'react'

export const FilterableProductTable = React.createClass({
    render() {
        return (
            <div id="productTable">
              <SearchBar />
            </div>
        )
    }
})

export const SearchBar = React.createClass({
    render() {
        return (
            <div id="searchBar"></div>
        )
    }
})
