import React from 'react'
import Weather from './Weather'

const Result = ({ countries, showCountry }) => {
    const countryList = countries.map(country => <div key={country.numericCode}>
            {country.name}
            <button onClick={() => showCountry(country.name)}>show</button>
        </div>
        )

    if (countries.length === 250) {
        return <div></div>
    }

    else if (countries.length === 1) {
        const { name, capital, population, languages, flag } = countries[0]
        const languageList = languages.map(language => <li key={language.iso639_1}>{language.name}</li>)

        return (
            <div>
                <h1>{name}</h1>
                <div>capital {capital}</div>
                <div>population {population} </div>
                <h3>Spoken languages</h3>
                <ul>
                    {languageList}
                </ul>
                <img src={flag} alt={"Flag"} height="100" width="150"/>
                <Weather capital={capital} />
            </div>
        )
    }

    else {
        return (
            <div>
                {countries.length > 10 ? "Too many matches, specify another filter" : countryList}
            </div>
        )
    }
}


export default Result