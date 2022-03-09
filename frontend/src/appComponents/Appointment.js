import AppointmentCreate from './AppointmentCreate'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';


const Appointment = ({ jwt, isLoggedIn }) => {
    console.log(isLoggedIn)

    const navigate = useNavigate()

    if (isLoggedIn) {
    return ( 
        <div className="appointment">
            <AppointmentCreate />
        </div>
     ) }
            // navigate("/signin")
            // return (
            //     <div>loading...</div>
            // )

     return (
         <div>
             You need to <Link to="/signin">sign in</Link> first!
         </div>
     )
}

export default Appointment;