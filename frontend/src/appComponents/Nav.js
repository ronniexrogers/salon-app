import { Link } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useState } from "react";
import GoogleButton from 'react-google-button'

const Nav = ({ setIsLoggedIn, isLoggedIn }) => {
    const [showLogoutButton, setShowLogoutButton] = useState(false)
    const clientId = '996392350039-svujvj42te46nbsotn01j8pgv2p40nq3.apps.googleusercontent.com'

    const onLogoutSuccess = () => {
        alert('logout success')
        setShowLogoutButton(false)
        setIsLoggedIn(false)
    }

    if(isLoggedIn){
        return ( 
            <div className="nav">
                <nav>
                    <Link to="/">Home </Link> |
                    <Link to="/appointment"> Create Appointment </Link> |
                    <Link to="/gallery"> Gallery </Link> |
                    <Link to="/about"> About </Link> |
                    <Link to="/contact"> Contact Us </Link> |
                    {isLoggedIn ? 
                    <GoogleLogout
                        clientId={clientId}
                        buttonText="Sign Out"
                        onLogoutSuccess={onLogoutSuccess}
                        SameSite="None"
                        render={renderProps => (
                            <Link to="/" label='Sign Out' onClick={renderProps.onClick} disabled={renderProps.disabled}> Sign Out</Link>
                          )}
                    /> : null}
                </nav>
            </div>
         ); 
    }
    return ( 
        <div className="nav">
            <nav>
                <Link to="/">Home </Link> |
                <Link to="/appointment"> Create Appointment </Link> |
                <Link to="/gallery"> Gallery </Link> |
                <Link to="/about"> About </Link> |
                <Link to="/contact"> Contact Us </Link>
            </nav>
        </div>
     );
}
 
export default Nav;
