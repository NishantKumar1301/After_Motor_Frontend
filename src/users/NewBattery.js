import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../MainPage/Header'
import './NewBattery.css'

function NewBattery() {
  const history = useHistory() 

  const [formData, setFormData] = useState({
    date: '',
    serial: '',
    manufacturer: '',
    name: '',
    city: '',
    number: '',
    courierName: '',
    trackingId: '',
    voltage: '',
    ah: '',
    batterySerial: '',
    mfgDate: '',
    issue: '',
  })

  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [success, setSuccess] = useState(false) 

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.number.length !== 10) {
      setPhoneNumberError('The phone number should exactly contain 10 digits')
      return
    }

    setPhoneNumberError('')

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)

        console.log('Form submission successful')
      } else {
        console.error('Form submission failed')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRedirect = () => {
    history.push('/') 
  }

  return (
    <main>
      <Header />

      {success ? (
        <div className="success-message">
          <p>Battery Sucessfully Added To Job Card!</p>
          <button onClick={handleRedirect}>OK</button>
        </div>
      ) : (
        <form>
          <h1>Inward Entry</h1>
          <hr />
          <p className="align">
            <label htmlFor="date">Date Of Inward</label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="serial">Inward Serial Number</label>
            <input
              type="number"
              id="serial"
              name="serial"
              placeholder="Enter value"
              value={formData.serial}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="manufacturer">Battery Manufacturer</label>
            <select
              name="manufacturer"
              id="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              required
            >
              <option>Select a Manufacturer</option>
              <option value="IPOWER">IPOWER</option>
              <option value="LOHUM">LOHUM</option>
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
            <label htmlFor="name">Customer Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter value"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Enter city name"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="number">Phone Number</label>
            <input
              type="number"
              id="number"
              name="number"
              placeholder="Enter Phone Number"
              minLength={10}
              maxLength={10}
              value={formData.number}
              onChange={handleChange}
            />
            {phoneNumberError && (
              <p className="error-red">{phoneNumberError}</p>
            )}
          </p>
          <p className="align">
            <label htmlFor="courierName">Courier Name</label>
            <input
              type="text"
              name="courierName"
              id="courierName"
              placeholder="Enter value"
              value={formData.courierName}
              onChange={handleChange}
              required
            />
          </p>

          <p className="align">
            <label htmlFor="trackingId">Inward courier tracking Id</label>
            <input
              type="number"
              name="trackingId"
              id="trackingId"
              placeholder="Enter value"
              value={formData.trackingId}
              onChange={handleChange}
              required
            />
          </p>
          <h4 className="align">
            <label htmlFor="voltage">Model No Voltage</label>
            <select
              name="voltage"
              id="voltage"
              value={formData.voltage}
              onChange={handleChange}
              required
            >
              <option>Select voltage</option>
              <option>48V</option>
              <option>60V</option>
              <option>61V</option>
              <option>62V</option>
              <option>72V</option>
            </select>

            <label htmlFor="ah">Model No Ah</label>
            <select
              name="ah"
              id="ah"
              value={formData.ah}
              onChange={handleChange}
              required
            >
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
          </h4>
          <p className="align">
            <label htmlFor="batterySerial">Battery Serial number</label>
            <input
              type="text"
              name="batterySerial"
              id="batterySerial"
              placeholder="Enter value"
              value={formData.batterySerial}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="mfgDate">Mfg date</label>
            <input
              type="date"
              id="mfgDate"
              name="mfgDate"
              value={formData.mfgDate}
              onChange={handleChange}
            />
          </p>
          <p className="align">
            <label htmlFor="issue">Battery Issue From Customer</label>
            <select
              name="issue"
              id="issue"
              value={formData.issue}
              onChange={handleChange}
              required
            >
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

          <hr />
          <p>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </p>
        </form>
      )}
    </main>
  )
}

export default NewBattery
