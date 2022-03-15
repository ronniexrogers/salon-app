import React from 'react'
import { Link } from "react-router-dom"
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useState } from "react"
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom"
import { Nav, NavItem } from "reactstrap"

const NavBar = ({ userData, setIsLoggedIn, isLoggedIn }) => {
    const [showLogoutButton, setShowLogoutButton] = useState(false)
    const clientId = '996392350039-9plg5206hu16pii68bk6akvkr1b47gg2.apps.googleusercontent.com'
    const navigate = useNavigate()
    const modal = document.querySelector('.loggedout-modal')

    const onLogoutSuccess = () => {
        setShowLogoutButton(false)
        setIsLoggedIn(false)
        modal.style.display = "block"
    }

    const handleCloseModal = () => {
        modal.style.display = "none"
        navigate('/')
      }

    if(isLoggedIn){
        return ( 
            <div className="nav">
                <Nav fill justified tabs>
                    <NavItem>
                    <Link to="/"> Home </Link>
                    </NavItem>
                    <NavItem>
                    <Link to="/appointment"> Book an Appointment </Link>
                    </NavItem>
                    <NavItem>
                    <Link to="/gallery"> Gallery </Link>
                    </NavItem>
                    <NavItem>
                    <Link to="/about"> About </Link>
                    </NavItem>
                    <NavItem>
                    <Link to="/contact"> Contact Me </Link>
                    </NavItem>
                    <NavItem>
                    <Link to="/myProfile"> My Profile</Link>
                    </NavItem>
                </Nav>
                <div className="loggedout-modal">
                    Succesfully logged out!
                    <button onClick={() => handleCloseModal()}>Close</button>
                </div>
            </div>
         )
    }
    return ( 
        <div className="nav">
             <Nav fill justified pills tabs>
                <NavItem>
                <Link to="/"> Home </Link>
                </NavItem>
                <NavItem>
                <Link to="/appointment"> Book an Appointment </Link>
                </NavItem>
                <NavItem>
                <Link to="/gallery"> Gallery </Link>
                </NavItem>
                <NavItem>
                <Link to="/about"> About </Link>
                </NavItem>
                <NavItem>
                <Link to="/contact"> Contact Me </Link>
                </NavItem>
            </Nav>
        </div>
     )
}
 
export default NavBar
