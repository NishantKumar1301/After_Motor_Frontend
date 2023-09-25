import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../MainPage/Header'
import axios from 'axios'

function UpdatedBalancing() {
  const { serialNumber } = useParams()

  const [formData, setFormData] = useState({
    serial: serialNumber,
    date: '',
    maxString: '',
    minString: '',
    series: '',
    balancedV: '',
    afterBalance: '',
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`
    return formattedDate
  }

  useEffect(() => {
    const fetchBalancingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/updatedSearch/${serialNumber}`
        )

        if (response.data) {
          const data = response.data
          data.date = formatDate(data.date)
          setFormData(data)
        } else {
          setError('Data not found')
        }
      } catch (error) {
        console.error('Error fetching Balancing data:', error)
        setError('An error occurred while fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchBalancingData()
  }, [serialNumber])

  return (
    <main>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form className="balancing">
          <h1>Balancing</h1>
          <p className="align">
            <label htmlFor="date">Date Of Action</label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={formData.date}
              readOnly
            />
          </p>
          <p className="align">
            <label htmlFor="maxString">String max V</label>
            <input
              type="text"
              name="maxString"
              id="maxString"
              value={formData.maxString}
              readOnly
            />
          </p>
          <p className="align">
            <label htmlFor="minString">String min V</label>
            <input
              type="text"
              name="minString"
              id="minString"
              value={formData.minString}
              readOnly
            />
          </p>
          <p className="align">
            <label htmlFor="series">No. Of Series</label>
            <input
              type="text"
              name="series"
              id="series"
              value={formData.series}
              readOnly
            />
          </p>
          <p className="align">
            <label htmlFor="balancedV">Balanced V</label>
            <input
              type="text"
              name="balancedV"
              id="balancedV"
              value={formData.balancedV}
              readOnly
            />
          </p>
          <p className="align">
            <label htmlFor="afterBalance">After Balance Battery Pack V</label>
            <input
              type="text"
              name="afterBalance"
              id="afterBalance"
              value={formData.afterBalance}
              readOnly
            />
          </p>
          <hr />
          <button type="button" disabled>
            Submit
          </button>
        </form>
      )}
    </main>
  )
}

export default UpdatedBalancing
