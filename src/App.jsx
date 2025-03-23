import './App.css'
import './bootstrap.min.css'
import { Route,Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserAuth from './Pages/UserAuth'
import AdminDash from './Pages/AdminDash'
import ManageUser from './Pages/ManageUser'
// import Header from './Components/Header'
import Verify from './Pages/Verify'
import ManageSP from './Pages/ManageSP'
import MngCategory from './Pages/MngCategory'
import ViewComplaints from './Pages/ViewComplaints'
import ViewRatFeed from './Pages/ViewRatFeed'

import ServiceDash from './Pages/ServiceDash'
import ProfileSp from './Pages/ProfileSp'
import ServiceRequest from './Pages/ServiceRequest'
import WorkStatus from './Pages/WorkStatus'
import WorkHistory from './Pages/WorkHistory'
import RatFeedSp from './Pages/RatFeedSp'
import ChatSp from './Pages/ChatSp'

import UserDash from './Pages/UserDash'
import ListViewSp from './Pages/ListViewSp'
import ChatUser from './Pages/ChatUser'
import RatFeedUser from './Pages/RatFeedUser'
import BookSp from './Pages/BookSp'
import AllBookings from './Pages/AllBookings'
import ComplaintsUser from './Pages/ComplaintsUser'
import Landing from './Pages/Landing';

function App() {

  return (
    <>
      <div>
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/authUser' element={<UserAuth/>}/>
          
          <Route path='/dashadmin' element={<AdminDash/>}/>
          <Route path='/mnguser' element={<ManageUser/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/mngsp' element={<ManageSP/>}/>
          <Route path='/mngcat' element={<MngCategory/>}/>
          <Route path='/viewcom' element={<ViewComplaints/>}/>
          <Route path='/ratfeed' element={<ViewRatFeed/>}/>

          <Route path='/dashservice' element={<ServiceDash/>} />
          <Route path='/profilesp' element={<ProfileSp/>} />
          <Route path='/servicereq' element={<ServiceRequest/>} />
          <Route path='/workstat' element={<WorkStatus/>} />
          <Route path='/workhis' element={<WorkHistory/>} />
          <Route path='/ratfeedsp' element={<RatFeedSp/>} />
          <Route path='/chatsp' element={<ChatSp/>} />

          <Route path='/dashuser' element={<UserDash/>} />
          <Route path='/listview/:category' element={<ListViewSp/>} />
          <Route path='/chatuser' element={<ChatUser/>} />
          <Route path='/ratfeeduser/:id' element={<RatFeedUser/>} />
          <Route path='/booksp/:id' element={<BookSp/>} />
          <Route path='/allbook' element={<AllBookings/>} />
          <Route path='/complaints' element={<ComplaintsUser/>} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  )
}

export default App
