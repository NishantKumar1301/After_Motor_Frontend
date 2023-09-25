import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../MainPage/Header'
import axios from 'axios'

function BatteryInspection() {
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

  const formatDate1 = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
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
          data.mfgDate = formatDate1(data.mfgDate)

          const mfgDate = new Date(data.mfgDate)
          const currentDate = new Date()
          const diffMonths =
            (currentDate.getFullYear() - mfgDate.getFullYear()) * 12 +
            (currentDate.getMonth() - mfgDate.getMonth())

          const warrantyStatus =
            diffMonths >= 36 ? 'Warranty expired 😔' : 'In Warranty 😀'
          const expectedAh = diffMonths * 0.83

          setFormData((prevData) => ({
            ...prevData,
            ...data,
            warranty: warrantyStatus,
            expectedAh: expectedAh,
          }))
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


  useEffect(() => {
    let upperVoltResult
    let lowerVoltResult

    if (
      formData.voltage === '72V' &&
      ['29AH', '40AH', '46AH', '50AH'].includes(formData.ah)
    ) {
      upperVoltResult = '84'
      lowerVoltResult = '58' 
    } else if (
      formData.voltage === '48V' &&
      ['26AH', '29AH'].includes(formData.ah)
    ) {
      upperVoltResult = '54.6'
      lowerVoltResult = '37.7'
    } else if (
      formData.voltage === '60V' &&
      ['20AH', '24AH', '26AH', '29AH', '34AH'].includes(formData.ah)
    ) {
      upperVoltResult = '67.2'
      lowerVoltResult = '46.4'
    } else if (
      formData.voltage === '62V' &&
      ['21AH', '29AH', '32AH', '35AH', '52AH'].includes(formData.ah)
    ) {
      upperVoltResult = '71.4'
      lowerVoltResult = '49.3'
    } else if (formData.voltage === '51V' && ['26AH'].includes(formData.ah)) {
      upperVoltResult = '58.8'
      lowerVoltResult = '40.6'
    } else {
      upperVoltResult = 'No matching condition found'
      lowerVoltResult = 'No matching condition found'
    }

    setFormData((prevData) => ({
      ...prevData,
      upperVolt: upperVoltResult,
      lowerVolt: lowerVoltResult, 
    }))
  }, [formData.voltage, formData.ah])


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isUpdate) {
        await axios.put(
          `http://localhost:5000/update/${serialNumber}`,
          formData
        )
        console.log('Data updated successfully')
        alert('Battery Inspection done successfully 😊')
        window.location.href = 'http://localhost:3000/'
      } else {
        await axios.post('http://localhost:5000/submit', formData)
        console.log('Data saved successfully')
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

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }


  return (
    <main>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form className="inspection" onSubmit={handleSubmit}>
          <h1>{isUpdate ? 'Battery Inspection' : 'Battery Inspection'}</h1>
          <p className="align">
            <label htmlFor="date">Date Of Inward</label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={formData.date}
            />
          </p>
          <p className="align">
            <label htmlFor="manufacturer">Battery Manufacturer</label>
            <select
              name="manufacturer"
              id="manufacturer"
              value={formData.manufacturer}
            >
              <option value="">Select An Option</option>
              <option value="IPOWER">IPOWER</option>
              <option value="OKINAWA MAKE BATTERY">OKINAWA MAKE BATTERY</option>
              <option value="TR BENLING">TR BENLING</option>
              <option value="TR BGAUSS">TR BGAUSS</option>
              <option value="TR BOLT">TR BOLT</option>
              <option value="TR JITENDRA">TR JITENDRA</option>
              <option value="TR M2GO">TR M2GO</option>
              <option value="TR NDS">TR NDS</option>
              <option value="TR ODYSSEY">TR ODYSSEY</option>
              <option value="TR OKINAWA">TR OKINAWA</option>
              <option value="TR QUANTUM">TR QUANTUM</option>
              <option value="TR WHITECARBON">TR WHITECARBON</option>
              <option value="INVERTED">INVERTED</option>
              <option value="Oher">Other(Please specify)</option>
            </select>
          </p>

          <p className="align">
            <label htmlFor="batterySerial">Battery Serial number</label>
            <input
              type="text"
              name="batterySerial"
              id="batterySerial"
              placeholder="Enter value"
              value={formData.batterySerial}
            />
          </p>

          <p className="align">
            <label htmlFor="mfgDate">Mfg date</label>
            <input
              type="date"
              id="mfgDate"
              name="mfgDate"
              value={formData.mfgDate}
            />
          </p>

          <p className="align">
            <label htmlFor="issue">Battery Issue From Customer</label>
            <select name="issue" id="issue" value={formData.issue}>
              <option value="">Select an option</option>
              <option>Low Mileage</option>
              <option>Connector Melt</option>
              <option>BMS Sleep</option>
              <option>Battery Not Charging</option>
              <option>Heating</option>
              <option>Physical Damage</option>
              <option>Water Ingress</option>
              <option>0 Voltage</option>
            </select>
          </p>

          <p className="align">
            <label htmlFor="condition">Physical Condition</label>
            <select
              name="condition"
              id="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option>Select an option</option>
              <option>Damage</option>
              <option>Connector Issue</option>
              <option>Water Logging</option>
              <option>No Issue Observed</option>
            </select>
          </p>

          <p className="align">
            <label htmlFor="warranty">Warranty</label>
            <input
              type="text"
              id="warranty"
              name="warranty"
              placeholder="Enter value"
              value={formData.warranty}
              required
            />
          </p>

          <p className="align">
            <label htmlFor="volt">Initial Battery Back Voltage</label>
            <input
              type="number"
              id="volt"
              name="volt"
              placeholder="Enter value"
              value={formData.volt}
              onChange={handleChange}
              required
            />
          </p>

          <p className="align">
            <label htmlFor="capacity">Cell Capacity Ah</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              placeholder="Enter value"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </p>

          <p className="align">
            <label htmlFor="voltCapacity">Cell Capacity Volt</label>
            <input
              type="number"
              id="voltCapacity"
              name="voltCapacity"
              placeholder="Enter value"
              value={formData.voltCapacity}
              onChange={handleChange}
              required
            />
          </p>

          <p className="align">
            <label htmlFor="series">No. Of Series</label>
            <select
              name="series"
              id="series"
              value={formData.series}
              onChange={handleChange}
              required
            >
              <option>Select an option</option>
              <option>13</option>
              <option>16</option>
              <option>18</option>
              <option>20</option>
              <option>Other</option>
            </select>
          </p>

          <p className="align">
            <label htmlFor="parallel">Number Of Parallel</label>
            <input
              type="number"
              id="parallel"
              name="parallel"
              placeholder="Enter value"
              value={formData.parallel}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="expectedAh">Expected Ah</label>
            <input
              type="number"
              id="expectedAh"
              name="expectedAh"
              placeholder="Enter value"
              value={formData.expectedAh}
            />
          </p>

          <p className="align">
            <label htmlFor="upperVolt">Upper Voltage Limit</label>
            <input
              type="text"
              id="upperVolt"
              name="upperVolt"
              placeholder="No matching conditions found"
              value={formData.upperVolt}
            />
          </p>

          <p className="align">
            <label htmlFor="lowerVolt">Lower Voltage Limit</label>
            <input
              type="text"
              id="lowerVolt"
              name="lowerVolt"
              placeholder="No matching conditions found"
              value={formData.lowerVolt}
            />
          </p>

          <p className="align">
            <label htmlFor="voltage">Model No Voltage</label>
            <select name="voltage" id="voltage" value={formData.voltage}>
              <option>Select voltage</option>
              <option>48V</option>
              <option>60V</option>
              <option>61V</option>
              <option>62V</option>
              <option>72V</option>
            </select>

            <label htmlFor="ah">Model No Ah</label>
            <select name="ah" id="ah" value={formData.ah}>
              <option>Select Ah</option>
              <option>21AH</option>
              <option>23AH</option>
              <option>24AH</option>
              <option>26AH</option>
              <option>28AH</option>
              <option>29AH</option>
              <option>30AH</option>
              <option>32AH</option>
              <option>34AH</option>
              <option>35AH</option>
              <option>40AH</option>
              <option>46AH</option>
              <option>48AH</option>
              <option>50AH</option>
              <option>52AH</option>
              <option>55AH</option>
            </select>
          </p>
          <hr />
          <button type="submit">{isUpdate ? 'Submit' : 'Submit'}</button>
        </form>
      )}
    </main>
  )
}

export default BatteryInspection
