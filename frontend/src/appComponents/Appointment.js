import AppointmentCreate from './AppointmentCreate'
import { Link } from "react-router-dom";

const Appointment = ({ isLoggedIn }) => {

    if (isLoggedIn) {
    return ( 
        <div className="appointment">
            <AppointmentCreate />
        </div>
     ) } return (
         <div>
             You need to <Link to="/signin">sign In</Link> first!
            
         </div>
     )
}

export default Appointment;