import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../MainPage/Header'
import axios from 'axios'

function UpdatedInspection() {
  const { serialNumber } = useParams()

  const [formData, setFormData] = useState({
    serial: serialNumber,
    date: '',
    manufacturer: '',
    batterySerial: '',
    mfgDate: '',
    issue: '',
    condition: '',
    warranty: '',
    volt: '',
    capacity: '',
    voltCapacity: '',
    series: '',
    parallel: '',
    expectedAh: '',
    upperVolt: '',
    lowerVolt: '',
    voltage: '',
    ah: '',
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

   const formatDate1 = (dateString) => {
     const date = new Date(dateString)
     const year = date.getFullYear()
     const month = String(date.getMonth() + 1).padStart(2, '0')
     const day = String(date.getDate()).padStart(2, '0')
     const formattedDate = `${year}-${month}-${day}`
     return formattedDate
   }

  useEffect(() => {
    const fetchUpdatedData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/updatedSearch/${serialNumber}`
        )

        if (response.data) {
          const data = response.data
          data.date = formatDate(data.date)
          data.mfgDate = formatDate1(data.mfgDate)

          setFormData(data)
        } else {
          setError('Data not found')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('An error occurred while fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchUpdatedData()
  }, [serialNumber])

  return (
    <main>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form className="inspection">
          <h1>Battery Inspection</h1>
          <p className="align">
            <label htmlFor="date">Date Of Inward</label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={formData.date}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="manufacturer">Battery Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              id="manufacturer"
              value={formData.manufacturer}
              readOnly
            />
          </p>
          <p className="align">
            <label htmlFor="batterySerial">Battery Serial number</label>
            <input
              type="text"
              name="batterySerial"
              id="batterySerial"
              value={formData.batterySerial}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="mfgDate">Mfg date</label>
            <input
              type="date"
              id="mfgDate"
              name="mfgDate"
              value={formData.mfgDate}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="issue">Battery Issue From Customer</label>
            <input
              type="text"
              name="issue"
              id="issue"
              value={formData.issue}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="condition">Physical Condition</label>
            <input
              type="text"
              name="condition"
              id="condition"
              value={formData.condition}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="warranty">Warranty</label>
            <input
              type="text"
              id="warranty"
              name="warranty"
              value={formData.warranty}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="volt">Initial Battery Back Voltage</label>
            <input
              type="text"
              id="volt"
              name="volt"
              value={formData.volt}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="capacity">Cell Capacity Ah</label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="voltCapacity">Cell Capacity Volt</label>
            <input
              type="text"
              id="voltCapacity"
              name="voltCapacity"
              value={formData.voltCapacity}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="series">No. Of Series</label>
            <input
              type="text"
              id="series"
              name="series"
              value={formData.series}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="parallel">Number Of Parallel</label>
            <input
              type="text"
              id="parallel"
              name="parallel"
              value={formData.parallel}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="expectedAh">Expected Ah</label>
            <input
              type="text"
              id="expectedAh"
              name="expectedAh"
              value={formData.expectedAh}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="upperVolt">Upper Voltage Limit</label>
            <input
              type="text"
              id="upperVolt"
              name="upperVolt"
              value={formData.upperVolt}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="lowerVolt">Lower Voltage Limit</label>
            <input
              type="text"
              id="lowerVolt"
              name="lowerVolt"
              value={formData.lowerVolt}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="voltage">Model No Voltage</label>
            <input
              type="text"
              id="voltage"
              name="voltage"
              value={formData.voltage}
              readOnly 
            />
          </p>
          <p className="align">
            <label htmlFor="ah">Model No Ah</label>
            <input
              type="text"
              id="ah"
              name="ah"
              value={formData.ah}
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

export default UpdatedInspection
