import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './context/ContextApi.jsx'
import UserCountApi from './context/UserCountApi.jsx'
import ServiceCount from './context/ServiceCount.jsx'
import ComplaintApi from './context/ComplaintApi.jsx'
import WorkContext from './context/WorkContext.jsx'
import ReqContext from './context/ReqContext.jsx'
import Avgrating from './context/Avgrating.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextApi>
        <UserCountApi>
          <ServiceCount>
            <ComplaintApi>
              <Avgrating>
                <WorkContext>
                  <ReqContext>
                    <App />
                  </ReqContext>
                </WorkContext>
              </Avgrating>
            </ComplaintApi>
          </ServiceCount>
        </UserCountApi>
      </ContextApi>
    </BrowserRouter>
  </StrictMode>,
)
