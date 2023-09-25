import React, { useState, useEffect } from 'react'
import Header from '../MainPage/Header'
import { Link } from 'react-router-dom'
import './page.css'
function Page() {
  const [updatedNumbers, setupdatedNumbers] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/updatedNumbers')
      .then((response) => response.json())
      .then((data) => {
        setupdatedNumbers(data)
        setError(null)
      })
      .catch((error) => {
        console.error('Error fetching serial numbers:', error)
        setError(error)
      })
  }, [])

  const handleSearch = () => {
    if (!searchValue) {
      setSearchResults([])
      setNoResults(false)
    } else {
      const matchingupdatedNumbers = updatedNumbers.filter((serialNumber) =>
        serialNumber.batterySerial.includes(searchValue)
      )

      if (matchingupdatedNumbers.length > 0) {
        setSearchResults(matchingupdatedNumbers)
        setNoResults(false)
      } else {
        setSearchResults([])
        setNoResults(true)
      }
      setError(null)
    }
  }

  const handleOKButtonClick = () => {
    setSearchResults([])
    setNoResults(false)
    setSearchValue('')
  }

  return (
    <main>
      <Header />
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search battery serial number"
          className="search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="button" className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error ? (
        <div className="error-box">
          <h1>Error: {error.message}</h1>
        </div>
      ) : noResults ? (
        <div className="no-results-box">
          <h1>No matching battery found.</h1>
          <button onClick={handleOKButtonClick}>OK</button>
        </div>
      ) : (
        <ul className="search-list">
          {searchResults.length > 0 ? (
            searchResults.map((serialNumber, index) => (
              <li className="search-item" key={index}>
                <Link to={`/updatedLinkPage/${serialNumber.batterySerial}`}>
                  {serialNumber.batterySerial}
                </Link>
              </li>
            ))
          ) : updatedNumbers.length > 0 ? (
            updatedNumbers.map((serialNumber, index) => (
              <li className="search-item" key={index}>
                <Link to={`/updatedLinkpage/${serialNumber.batterySerial}`}>
                  {serialNumber.batterySerial}
                </Link>
              </li>
            ))
          ) : (
            <li>No Battery available.</li>
          )}
        </ul>
      )}
    </main>
  )
}

export default Page
