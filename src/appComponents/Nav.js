import React from 'react'
import { Link } from "react-router-dom"
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useState } from "react"
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom"
import { Nav, 
        NavItem, 
        Navbar, 
        Button, 
        Collapse 
    } from "reactstrap"

const Navigation = ({ userData, setIsLoggedIn, isLoggedIn, isAdmin }) => {
    const [showLogoutButton, setShowLogoutButton] = useState(false)
    const [expand, setExpand] = useState(false)
    const clientId = process.env.GOOGLE_CLIENT_ID
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

                <div className='mobile-nav'>
                <Navbar
                    color="faded"
                    light
                    expand="lg"
                    navbar-default
                >
                    <Collapse navbar isOpen={true}>
                    <Nav className="me-auto" navbar>
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
                        className="navlink"
                        onLogoutSuccess={onLogoutSuccess}
                        SameSite="None"
                        render={renderProps => (
                            <NavItem>
                            <Link className="navlink" to="/" label='Sign Out' onClick={renderProps.onClick} disabled={renderProps.disabled}> Sign Out</Link>
                            </NavItem>
                          )}
                    /> : null}
                    </Nav>
                    </Collapse>
                </Navbar>
                </div>

                <div className="desktop-nav">
                <Navbar className='nav-bar' expand="md" >
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
                    <Button className='modal-button' block color="success" size="sm"  onClick={() => handleCloseModal()}>Close</Button>
                    </div>
                </div>
            </div>
         )
    }
    return ( 
        <div className="nav">

                <div className='mobile-nav'>
                <Navbar
                    color="faded"
                    light
                    expand="lg"
                    navbar-default
                >
                    <Collapse navbar isOpen={true}>
                    <Nav className="me-auto" navbar>
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
                    </Nav>
                    </Collapse>
                </Navbar>
                </div>

            <div className="desktop-nav">
            <Navbar className='nav-bar' expand="md" >
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
        </div>
     )
}
 
export default Navigation
