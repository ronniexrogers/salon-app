import React, {useState} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom'


const SignIn = ({ setJwt, isLoggedIn, setIsLoggedIn }) => {
    
    const clientId = '996392350039-svujvj42te46nbsotn01j8pgv2p40nq3.apps.googleusercontent.com'
    const [showLoginButton, setShowLoginButton] = useState(true)
    const [showLogoutButton, setShowLogoutButton] = useState(false)
    const navigate = useNavigate()

    const onLoginSuccess = (res) => {
        console.log(res)
        setShowLoginButton(false)
        setShowLogoutButton(true)
        setIsLoggedIn(true)
        navigate("/appointment")
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
        <div className="sign-in">
            {showLoginButton ? 
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
                SameSite="None"
                isSignedIn={true}
                accesstype= 'offline'
            />  : null} 
        </div>
     );
}
 
export default SignIn;
