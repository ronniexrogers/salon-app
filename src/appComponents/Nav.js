import React from 'react'
import { Link } from "react-router-dom"
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useState } from "react"
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom"
import { Nav, NavItem, Navbar } from "reactstrap"

const Navigation = ({ userData, setIsLoggedIn, isLoggedIn }) => {
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
                <Navbar className='nav-bar' color="success" expand="md" >
                    <NavItem>
                    <Link className="navlink" to="/"> Home </Link>
                    </NavItem>
                    <NavItem>
                    <Link className="navlink" to="/appointment"> Book an Appointment </Link>
                    </NavItem>
                    <NavItem>
                    <Link className="navlink" to="/gallery"> Gallery </Link>
                    </NavItem>
                    <NavItem>
                    <Link className="navlink" to="/about"> About </Link>
                    </NavItem>
                    <NavItem>
                    <Link className="navlink" to="/contact"> Contact Me </Link>
                    </NavItem>
                    <NavItem>
                    <Link className="navlink" to="/myProfile"> My Profile</Link>
                    </NavItem>
                    {isLoggedIn ? 
                    <GoogleLogout
                        clientId={clientId}
                        buttonText="Sign Out"
                        onLogoutSuccess={onLogoutSuccess}
                        SameSite="None"
                        render={renderProps => (
                            <Link className="navlink" to="/" label='Sign Out' onClick={renderProps.onClick} disabled={renderProps.disabled}> Sign Out</Link>
                          )}
                    /> : null}
                </Navbar>
                <div className="loggedout-modal">
                    Succesfully logged out!
                    <button onClick={() => handleCloseModal()}>Close</button>
                </div>
            </div>
         )
    }
    return ( 
        <div className="nav">
            <Navbar className='nav-bar' color="success" expand="md" >
                <NavItem>
                <Link className="navlink" to="/"> Home </Link>
                </NavItem>
                <NavItem>
                <Link className="navlink" to="/appointment"> Book an Appointment </Link>
                </NavItem>
                <NavItem>
                <Link className="navlink" to="/gallery"> Gallery </Link>
                </NavItem>
                <NavItem>
                <Link className="navlink" to="/about"> About </Link>
                </NavItem>
                <NavItem>
                <Link className="navlink" to="/contact"> Contact Me </Link>
                </NavItem>
            </Navbar>
        </div>
     )
}
 
export default Navigation
