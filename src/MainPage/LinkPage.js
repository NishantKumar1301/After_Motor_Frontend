import React from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './LinkPage.css'

function LinkPage() {
  const { serialNumber } = useParams()
  return (
    <main>
      <Header />
      <div className="link-container">
        <ul className="link-list">
          <li className="link-item">
            <Link 
              to={`/batteryInspection/${serialNumber}`}
              className="link-text"
            >
              Battery Inspection
            </Link>
          </li>
          <li className="link-item">
            <Link to={`/balance/${serialNumber}`} className="link-text">
              Balancing
            </Link>
          </li>
          <li className="link-item">
            <Link to={`/cdcCycler/${serialNumber}`} className="link-text">
              CDC Cycler
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}

export default LinkPage
