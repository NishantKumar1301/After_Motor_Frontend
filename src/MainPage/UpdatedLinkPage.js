import React from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './LinkPage.css'

function UpdatedLinkPage() {
  const { serialNumber } = useParams()
  return (
    <main>
      <Header />
      <div className="link-container">
        <ul className="link-list">
          <li className="link-item">
            <Link
              to={`/updatedInspection/${serialNumber}`}
              className="link-text"
            >
              Battery Inspection
            </Link>
          </li>
          <li className="link-item">
            <Link
              to={`/updatedBalancing/${serialNumber}`}
              className="link-text"
            >
              Balancing
            </Link>
          </li>
          <li className="link-item">
            <Link to={`/updatedCdc/${serialNumber}`} className="link-text">
              CDC Cycler
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}

export default UpdatedLinkPage
