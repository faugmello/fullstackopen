import {useEffect, useState} from "react";
import service from "./service";

const App = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [weather, setWeather] = useState({})

    useEffect(() => {
        service.getCountries()
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

    useEffect(() => {
        if(filteredCountries.length === 1) {
            service.getWeatherForCapital(filteredCountries[0].capital)
                .then(response =>setWeather(response))
                .catch(error => console.log(error))
        } else {
            setWeather({})
        }
    }, [filteredCountries])

    const onFilterChange = event => {
        event.preventDefault()
        setFilter(event.target.value)
    }

    const onCountryClick = countryName => {
        setFilter(countryName.toLowerCase())
    }

    const content = () => {
        if (filteredCountries.length === 1) {
            return (
                <SingleCountry country={filteredCountries[0]} weather={weather} />
            )
        } else if (filteredCountries.length <= 10) {
            return (
                <Countries countries={filteredCountries} onClick={onCountryClick}/>
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

const Countries = ({countries, onClick}) => (
    <>
        {countries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={() => onClick(country.name.common)}>Show</button></p>)}
    </>
)

const SingleCountry = ({country, weather}) => {
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
            <h2>Weather in {country.capital}</h2>
            <div>
                <p>Temperature {weather.temperature} Celsius</p>
                <img src={weather.iconUrl}  alt={weather.description}/>
                <p>Wind {weather.windSpeed} m/s</p>
            </div>
        </>
    )
}

export default App
