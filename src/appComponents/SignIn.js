import React, {useState, useEffect} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
const axios = require('axios')


const SignIn = ({ userData, setUserData, isLoggedIn, setIsLoggedIn, }) => {
    
    const clientId = '996392350039-5plni84cj3ih2e64qlqrgv399k8t3gev.apps.googleusercontent.com'
    const [showLoginButton, setShowLoginButton] = useState(true)
    const [showLogoutButton, setShowLogoutButton] = useState(false)
    const navigate = useNavigate()
    const headers = {
        'Content-Type': 'application/json'}

    const createUser = async () => {
        try {
        const userInfo = {
            firstName: userData.givenName,
            lastName: userData.familyName,
            email: userData.email,
            googleId: userData.googleId,
            profilePicturePath: userData.imageUrl,
        }
        const result = await axios.post('https://ronnie-rogers-capstone-backend.herokuapp.com/api/users/createUser', userInfo, { headers: headers})
        return result.data
    }catch(err){
        console.log(err)
    }
    }

    const onLoginSuccess = async (res) => {
        setUserData(res.profileObj)
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

    useEffect(() => {
        createUser()
    }, [userData])

    return ( 
        <div className="sign-in">
            {showLoginButton ? 
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'https://www.denisseonfire.com'}
                SameSite="None"
                isSignedIn={true}
                accesstype= 'offline'
            />  : null} 
        </div>
     )
}

export default SignIn
