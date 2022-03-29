import React from 'react'
import { Link } from "react-router-dom"
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useState } from "react"
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom"
import { Nav, 
        NavItem, 
        Navbar, 
        NavbarToggler, 
        NavbarBrand, 
        Collapse 
    } from "reactstrap"

const Navigation = ({ userData, setIsLoggedIn, isLoggedIn }) => {
    const [showLogoutButton, setShowLogoutButton] = useState(false)
    const [expand, setExpand] = useState(false)
    const clientId = '996392350039-vkem3f69gsnoc5mjo33l1ktuhjeiglsh.apps.googleusercontent.com'
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
                    <NavbarToggler
                    onClick={() => setExpand(!expand)}
                    />
                    <Collapse navbar isOpen={expand}>
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
                    <button onClick={() => handleCloseModal()}>Close</button>
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
                    <NavbarToggler
                    onClick={() => setExpand(!expand)}
                    />
                    <Collapse navbar isOpen={expand}>
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
