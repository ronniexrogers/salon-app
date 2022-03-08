import React, {useState} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom'


const SignIn = ({ isLoggedIn, setIsLoggedIn }) => {
    
    const clientId = '996392350039-svujvj42te46nbsotn01j8pgv2p40nq3.apps.googleusercontent.com'
    const [showLoginButton, setShowLoginButton] = useState(true)
    const [showLogoutButton, setShowLogoutButton] = useState(false)
    const navigate = useNavigate()

    const onLoginSuccess = (res) => {
        console.log('login success', res.profileObj)
        setShowLoginButton(false)
        setShowLogoutButton(true)
        setIsLoggedIn(true)
    }

    const onLoginFailure = (res) => {
        console.log('login failed', res)
    }

    const onLogoutSuccess = () => {
        alert('logout success')
        setShowLoginButton(true)
        setShowLogoutButton(false)
        setIsLoggedIn(false)
    }

    return ( 
        <div onClick={() => navigate("/appointment")} className="sign-in">
            {showLoginButton ? 
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'none'}
                SameSite="None"
                isSignedIn={true}
            />  : null} 
            {showLogoutButton ? 
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onLogoutSuccess}
                SameSite="None"
            /> : null}
        </div>
     );
}
 
export default SignIn;