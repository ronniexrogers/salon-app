import { useState } from 'react'
import {Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Nav from './nav'
import Home from './home'
import SignIn from './signIn'
import Gallery from './gallery'
import Appointment from './appointment'


const App = () => {



  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </div>
  );
}

export default App;