import React, { useState, useEffect } from 'react'
import axios from "axios"

import Search from './components/Search'
import Result from './components/Result'

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ filter, setFilter ] = useState("")

    let filtered_countries = [...countries]

    if(filter) {
        filtered_countries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()) ) 
    }

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(response => setCountries(response.data))
            
    })

    const handleFilterChange = (e) => setFilter(e.target.value) 
    const showCountry = (country) => setFilter(country)

    return (
        <div>
            <Search filter={filter} handleFilterChange={handleFilterChange} />
            <Result countries={filtered_countries} showCountry={showCountry} />
        </div>
    )
}

export default App