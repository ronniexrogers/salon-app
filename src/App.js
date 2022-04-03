import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './appComponents/CSS/App.css'
import Home from './appComponents/Home'
import SignIn from './appComponents/SignIn'
import Gallery from './appComponents/Gallery'
import Appointment from './appComponents/Appointment'
import About from './appComponents/About'
import Contact from './appComponents/Contact'
import MyProfile from './appComponents/MyProfile'
import Footer from './appComponents/Footer'
import { useEffect, useState, useRef } from 'react'
import Navigation from './appComponents/Nav'
const axios = require('axios')


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})
  const [dataFromDB, setDataFromDB] = useState(null)
  const admin = useRef(false)

  useEffect(() => {
    axios.get(`https://ronnie-rogers-capstone-backend.herokuapp.com/api/users/${userData.googleId}`)
    .then ((res) => {
      setDataFromDB(res.data[0])
    })
  }, [userData])

  if(dataFromDB) { 
    dataFromDB.googleId === '114694917534994982394' ? admin.isAdmin = true : admin.isAdmin = false
    }


  return (
    <div className="App">
      <Router>
        <Navigation isAdmin={admin.isAdmin} userData={ userData } setIsLoggedIn={ setIsLoggedIn } isLoggedIn={isLoggedIn} />
        <div className="content-wrap">
        <Routes>
          <Route path="/" element={<Home isAdmin={admin.isAdmin} />} />
          <Route path="/signin" element={<SignIn setUserData={ setUserData } userData={ userData } setIsLoggedIn={ setIsLoggedIn } isLoggedIn={isLoggedIn} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/appointment" element={<Appointment userData={ userData } isLoggedIn={ isLoggedIn } />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/myProfile" element={<MyProfile isAdmin={ admin.isAdmin } isLoggedIn={ isLoggedIn } dataFromDB={ dataFromDB } />} />
        </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App