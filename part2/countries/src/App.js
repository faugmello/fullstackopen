import {useEffect, useState} from "react";
import service from "./service";

const App = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])

    useEffect(() => {
        service.getCountry()
            .then(countries => {
                const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
                setCountries(sortedCountries)
            })
    }, [])

    useEffect(() => {
        const matchingCountries = countries.filter(country => {
            return country.name.common.toLowerCase().includes(filter)
        })
        setFilteredCountries(matchingCountries)
    }, [filter])

    const onFilterChange = event => {
        event.preventDefault()
        setFilter(event.target.value)
    }

    const content = () => {
        if (filteredCountries.length === 1) {
            console.log(filteredCountries[0])
            return (
                <SingleCountry country={filteredCountries[0]} />
            )
        } else if (filteredCountries.length <= 10) {
            return (
                <Countries countries={filteredCountries}/>
            )
        } else {
            return (
                <p>Too many matches, specify another filter</p>
            )
        }
    }

    return (
        <>
            <Filter value={filter} onFilterChange={onFilterChange}/>
            {content()}
        </>
    )
}

const Filter = ({value, onFilterChange}) => (
    <form>
        <p>find countries <input value={value} onChange={onFilterChange}/></p>
    </form>
)

const Countries = ({countries}) => (
    <>
        {countries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
    </>
)

const SingleCountry = ({country}) => {
    const languages = Object.values(country.languages)

    return (
        <>
            <h1>{country.name.common}</h1>
            <div>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
            </div>
            <h2>Languages</h2>
            <ul>
                {languages.map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <p style={{fontSize: 50}}>{country.flag}</p>
        </>
    )
}

export default App
