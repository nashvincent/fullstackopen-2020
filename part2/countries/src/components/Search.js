import React from 'react'

const Search = ({ filter, handleFilterChange }) => {
    return (
        <div>
            find countries <input value={filter} onChange={e => handleFilterChange(e) }/>
        </div>
    )
}

export default Search