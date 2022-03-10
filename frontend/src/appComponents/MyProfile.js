import { useState, useEffect } from 'react'

const axios = require('axios')

const MyProfile = ({ dataFromDB }) => {
    const [appointments, setAppointments] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:5001/api/appointments`)
        .then ((res) => {
            setAppointments(res.data)
        })
    }, [])

    if(dataFromDB.googleId === '114694917534994982394') {

        return (
            <div className="my-profile">
                <h1>Admin Dashboard</h1>
                <div className="all-appointments-div">
                    <h3>Appointments</h3>
                    { appointments ? appointments.map(appointment => (
                        <div key={appointment.id} className="single-appointment-div">
                            <ul>
                            <li>{appointment.date}</li>
                            <li>{appointment.name}</li>
                            <li>{appointment.number}</li>
                            <li>{appointment.description}</li>
                            <img src={appointment.imagePath} alt="appointment inspiration" />
                        </ul>
                        </div>

                    )) : <p>loading appointments...</p>}
                </div>
            </div>
        )
    }

    return ( 
        <div className="my-profile">
            Hello, {dataFromDB.firstName}!
            <img className="profile-picture" src={dataFromDB.profilePicturePath} alt="profile" />
        </div>
     );
}

export default MyProfile;