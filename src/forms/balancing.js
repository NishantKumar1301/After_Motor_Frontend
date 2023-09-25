import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../MainPage/Header'
import axios from 'axios'

function Balancing() {
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
  const [isUpdate, setIsUpdate] = useState(false)

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
          `http://localhost:5000/search/${serialNumber}`
        )

        if (response.data) {
          setIsUpdate(true)
          const data = response.data
          data.date = formatDate(data.date)
          setFormData(data)
        } else {
          setIsUpdate(false)
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

  const handleChange = (e) => {
    const staticFields = ['serialNumber', 'date']

    if (!staticFields.includes(e.target.name)) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isUpdate) {
        await axios.put(
          `http://localhost:5000/update/${serialNumber}`,
          formData
        )
        console.log('Data updated successfully')
        alert('Balancing Form sucessfully added 😊')
        window.location.href = 'http://localhost:3000/'
      } else {
        console.log('Balancing data saved successfully')
      }
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data)
      } else if (error.request) {
        console.error('No Response from Server:', error.request)
      } else {
        console.error('Request Error:', error.message)
      }
      setError('An error occurred while saving/updating data')
    }
  }

  return (
    <main>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form className="balancing" onSubmit={handleSubmit}>
          <h1>{isUpdate ? 'Balancing ' : 'Balancing'}</h1>
          <p className="align">
            <label htmlFor="date">Date Of Action</label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
            />
          </p>
          <p className="align">
            <label htmlFor="maxString">String max V</label>
            <input
              type="text"
              name="maxString"
              id="maxString"
              placeholder="Enter value"
              value={formData.maxString}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="minString">String min V</label>
            <input
              type="text"
              name="minString"
              id="minString"
              placeholder="Enter value"
              value={formData.minString}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="series">No. Of Series</label>
            <select name="series" id="series" value={formData.series} required>
              <option>Select an option</option>
              <option>13</option>
              <option>16</option>
              <option>18</option>
              <option>20</option>
              <option>Other</option>
            </select>
          </p>
          <p className="align">
            <label htmlFor="balancedV">Balanced V</label>
            <input
              type="text"
              name="balancedV"
              id="balancedV"
              placeholder="Enter value"
              value={formData.balancedV}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="afterBalance">After Balance Battery Pack V</label>
            <input
              type="text"
              name="afterBalance"
              id="afterBalance"
              placeholder="Enter value"
              value={formData.afterBalance}
              onChange={handleChange}
              required
            />
          </p>
          <hr />
          <button type="submit">{isUpdate ? 'Submit' : 'Submit'}</button>
        </form>
      )}
    </main>
  )
}

export default Balancing
