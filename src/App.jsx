import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SingnIn'
import Register from './pages/Register'
import Customer from './pages/Customer'
import Vendor from './pages/Vendor'
import Enquiry from './pages/Enquiry'
import Status from './pages/Stauts'
import UpdateStatus from './pages/UpdateStatus'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home/>} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/register' element={<Register />} />
      <Route path='/customer' element={ <Customer/> }/>
      <Route path='/vendor' element={ <Vendor /> } />
      <Route path='/enquire' element={ <Enquiry /> } />
      <Route path='/status' element={ <Status /> } />
      <Route path='/updatestatus' element={ <UpdateStatus /> } />

    </Routes>
  )
}

export default App