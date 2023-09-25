import React, { useState, useEffect } from 'react'
import Header from '../MainPage/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function UpdatedCdcCycler() {
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
          `http://localhost:5000/updatedSearch/${serialNumber}`
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

  return (
    <main>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form className="cdc">
          <h1>{isUpdate ? 'CDC Cycler' : 'CDC Cycler'}</h1>
          <p className="align">
            <label htmlFor="serial">Inward Serial Number</label>
            <input
              type="number"
              id="serial"
              name="serial"
              placeholder="Enter value"
              value={formData.serial}
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
            />
          </p>
          <p className="align">
            <label htmlFor="status">Final Status</label>
            <select name="status" id="status" value={formData.status} readOnly>
              <option value="">Select an option</option>
              <option>Repaired</option>
              <option>Not Repaired</option>
            </select>
          </p>
          <p className="align">
            <label htmlFor="submit">Submitted By</label>
            <select name="submit" id="submit" value={formData.submit} readOnly>
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
        </form>
      )}
    </main>
  )
}

export default UpdatedCdcCycler
