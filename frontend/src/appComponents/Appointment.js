import Calendar from './Calendar';
import ImageUpload from './ImageUpload'

const Appointment = () => {
    return ( 
        <div className="appointment">
            <Calendar />
            <ImageUpload />
        </div>
     );
}
 
export default Appointment;