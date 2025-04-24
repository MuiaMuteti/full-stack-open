const CountryFilter = ({ searchString, handleSearchStringChange }) => {
    return (
        <div>
            find countries <input value={searchString} onChange={handleSearchStringChange} />
        </div>
    )
}

export default CountryFilter