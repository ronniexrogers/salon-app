import AppointmentCreate from './AppointmentCreate'
import { Link } from "react-router-dom";


const Appointment = ({ jwt, isLoggedIn }) => {

    if (isLoggedIn) {
    return ( 
        <div className="appointment">
            <AppointmentCreate />
        </div>
     ) }

     return (
         <div>
             You need to <Link to="/signin">sign in</Link> first!
         </div>
     )
}

export default Appointment;