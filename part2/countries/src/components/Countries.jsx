import Country from "./Country"

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length > 1 && countries.length <= 10) {
        return (
            <div>
                {countries.map(c => <p key={c.name.common}>{c.name.common}</p>)}
            </div>
        )        
    } else if (countries.length === 1) {
        return (
            <Country country={countries[0]} />
        )
    } else {
        return <p>No matches</p>
    }
}

export default Countries