import React, { useState, useEffect } from 'react'
import Header from '../MainPage/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function CdcCycle() {
  const { serialNumber } = useParams()

  const [formData, setFormData] = useState({
    serial: serialNumber,
    c1charge: '',
    c2charge: '',
    c3charge: '',
    c1discharge: '',
    c2discharge: '',
    c3discharge: '',
    c1capacity: '',
    c2capacity: '',
    c3capacity: '',
    replacement: '',
    status: '',
    submit: '',
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const fetchCdcCycleData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/search/${serialNumber}`
        )

        if (response.data) {
          setIsUpdate(true)
          setFormData(response.data)
        } else {
          setIsUpdate(false)
        }
      } catch (error) {
        console.error('Error fetching CDC Cycler data:', error)
        setError('An error occurred while fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchCdcCycleData()
  }, [serialNumber])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

 const handleAction = async (e) => {
   e.preventDefault()

   try {
     let updateSuccess = false
     let deleteSuccess = false

     if (isUpdate) {
       await axios.put(`http://localhost:5000/update/${serialNumber}`, formData)

       alert('CDC Cycler data updated successfully 😊')
       updateSuccess = true
     } else {
     }

     await axios.post('http://localhost:5000/updatedSubmit', formData)
     if (isUpdate || !updateSuccess) {
       await axios.delete(`http://localhost:5000/delete/${serialNumber}`)
       console.log('Data deleted successfully')
       deleteSuccess = true
     }

     if (updateSuccess || deleteSuccess) {
       window.location.href = 'http://localhost:3000/'
     } else {
       setError('An error occurred while saving/updating data')
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
        <form className="cdc" onSubmit={handleAction}>
          <h1>{isUpdate ? 'CDC Cycler' : 'CDC Cycler'}</h1>
          <p className="align">
            <label htmlFor="serial">Inward Serial Number</label>
            <input
              type="number"
              id="serial"
              name="serial"
              placeholder="Enter value"
              value={formData.serial}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="c1charge">C1 After Charging V</label>
            <input
              type="text"
              name="c1charge"
              id="c1charge"
              placeholder="Enter value"
              value={formData.c1charge}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="c2charge">C2 After Charging V</label>
            <input
              type="text"
              name="c2charge"
              id="c2charge"
              placeholder="Enter value"
              value={formData.c2charge}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="c3charge">C3 After Charging V</label>
            <input
              type="text"
              name="c3charge"
              id="c3charge"
              placeholder="Enter value"
              value={formData.c3charge}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="c1discharge">C1 After Discharge V</label>
            <input
              type="text"
              name="c1discharge"
              id="c1discharge"
              placeholder="Enter value"
              value={formData.c1discharge}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="c2discharge">C2 After Discharge V</label>
            <input
              type="text"
              name="c2discharge"
              id="c2discharge"
              placeholder="Enter value"
              value={formData.c2discharge}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="c3discharge">C3 After Discharge V</label>
            <input
              type="text"
              name="c3discharge"
              id="c3discharge"
              placeholder="Enter value"
              value={formData.c3discharge}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="c1capacity">C1 capacity Ah</label>
            <input
              type="text"
              name="c1capacity"
              id="c1capacity"
              placeholder="Enter value"
              value={formData.c1capacity}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="c2capacity">C2 capacity Ah</label>
            <input
              type="text"
              name="c2capacity"
              id="c2capacity"
              placeholder="Enter value"
              value={formData.c2capacity}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="c3capacity">C3 capacity Ah</label>
            <input
              type="text"
              name="c3capacity"
              id="c3capacity"
              placeholder="Enter value"
              value={formData.c3capacity}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="replacement">Parts Replacement If Any</label>
            <input
              type="text"
              name="replacement"
              id="replacement"
              placeholder="Enter value"
              value={formData.replacement}
              onChange={handleChange}
              required
            />
          </p>
          <p className="align">
            <label htmlFor="status">Final Status</label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option>Repaired</option>
              <option>Not Repaired</option>
            </select>
          </p>
          <p className="align">
            <label htmlFor="submit">Submitted By</label>
            <select
              name="submit"
              id="submit"
              value={formData.submit}
              onChange={handleChange}
              requiredrequired
            >
              <option value="">Select an option</option>
              <option>KESHAB</option>
              <option>BHARAT</option>
              <option>ABHISHEK</option>
              <option>SIVA</option>
              <option>MOHAN</option>
              <option>DIWAKAR</option>
            </select>
          </p>
          <hr />
          <button type="submit">{isUpdate ? 'Submit' : 'Submit'}</button>
        </form>
      )}
    </main>
  )
}

export default CdcCycle
