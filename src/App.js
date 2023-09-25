import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MainPage from './MainPage/MainPage'
import NewBattery from './users/NewBattery'
import Page from './Searchpage/page'
import BatteryInspection from './forms/BatteryInspection'
import Balancing from './forms/balancing'
import CdcCycle from './forms/CdcCycle'
import LinkPage from './MainPage/LinkPage'
import UpdatedBalancing from './forms/updatedBalancing'
import UpdatedCdcCycler from './forms/updatedCdc'
import UpdatedInspection from './forms/udatedInspection'
import UpdatedPage from './Searchpage/UpdatedPage'
import UpdatedLinkPage from './MainPage/UpdatedLinkPage'

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/battery/new" exact>
            <NewBattery />
          </Route>
          <Route path="/battery/serialNumbers">
            <Page />
          </Route>
          <Route path="/updatedBattery/serialNumbers">
            <UpdatedPage />
          </Route>
          <Route exact path="/linkpage/:serialNumber" component={LinkPage} />
          <Route exact path="/updatedLinkpage/:serialNumber" component={UpdatedLinkPage} />
          <Route
            path="/batteryInspection/:serialNumber"
            component={BatteryInspection}
          />
          <Route path="/cdcCycler/:serialNumber" component={CdcCycle} />
          <Route path="/balance/:serialNumber" component={Balancing} />
          <Route path="/updatedInspection/:serialNumber">
            <UpdatedInspection />
          </Route>
          <Route path="/updatedBalancing/:serialNumber">
            <UpdatedBalancing />
          </Route>

          <Route path="/updatedCdc/:serialNumber">
            <UpdatedCdcCycler />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

export default App
