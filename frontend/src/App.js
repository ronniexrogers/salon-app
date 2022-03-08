import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './appComponents/CSS/App.css'
import Nav from './appComponents/Nav'
import Home from './appComponents/Home'
import SignIn from './appComponents/SignIn'
import Gallery from './appComponents/Gallery'
import Appointment from './appComponents/Appointment'
import About from './appComponents/About'
import Contact from './appComponents/Contact'
import { useState } from 'react'


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  console.log(isLoggedIn)

  return (
    <div className="App">
      <Router>
        <Nav isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setIsLoggedIn={ setIsLoggedIn } isLoggedIn={isLoggedIn} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/appointment" element={<Appointment isLoggedIn={ isLoggedIn } />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;