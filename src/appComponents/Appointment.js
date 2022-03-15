import AppointmentCreate from './AppointmentCreate'
import { Link } from "react-router-dom"


const Appointment = ({ userData, isLoggedIn }) => {

    if (isLoggedIn) {
    return ( 
        <div className="appointment">
            <AppointmentCreate userData={ userData } />
        </div>
     ) }

     return (
         <div>
             You need to <Link to="/signin">sign in</Link> first!
         </div>
     )
}

export default Appointment