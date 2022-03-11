import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const axios = require('axios')

const MyProfile = ({ dataFromDB }) => {
    const [appointments, setAppointments] = useState([])
    const [description, setDescription] = useState(null)
    const [type, setType] = useState(null)
    const [images, setImages] = useState([])
    const [file, setFile] = useState()
    const [pastAppointments, setPastAppointments] = useState([])
    const [futureAppointments, setFutureAppointments] = useState([])
    const todaysDate = new Date().valueOf()




    useEffect(() => {
        axios.get(`http://localhost:5001/api/appointments`)
        .then ((res) => {
            setAppointments(res.data)
        })
    }, [])

    const postImage = async ({image, description}) => {
        const formData = new FormData()
        formData.append("image", image)
        formData.append("description", description)
        formData.append("type", type)
        const result = await axios.post('/api/salonPhotos', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        return result.data
      }

    const submit = async (e) => {
        e.preventDefault()
        const result = await postImage({image: file, description})
        setImages([result, ...images])
      }
      const fileSelected = (e) => {
        const file = e.target.files[0]
            setFile(file)
        }

    useEffect(() => {
        setFutureAppointments(appointments.filter(appointment => Date.parse(appointment.date) > todaysDate))
        setPastAppointments(appointments.filter(appointment => Date.parse(appointment.date) < todaysDate))
    }, [appointments]) 
    
    if(!dataFromDB) return (<p>oopsie, what're ya doin here?! You need to <Link to="/signin">sign in</Link> first!</p>)

    else if(dataFromDB.googleId === '114694917534994982394' || '110622259906074900624') {


        return (
            <div className="my-profile">
                <h1>Admin Dashboard</h1>
                <div className="admin-upload-div">
                    <h3>Upload to Gallery</h3>
                    <form id="admin-upload" onSubmit={submit}>
                    <input required={true} className="input-text" placeholder='Description of photo' onChange={e => setDescription(e.target.value)} type="text"></input>
                    <label>Hair</label>
                    <input id="hair" type="checkbox" name="hair" value="hair" onChange={e => setType(e.target.value)} />
                    <label>Nails</label>
                    <input id="nails" type="checkbox" name="nails" value="nails" onChange={e => setType(e.target.value)} />
                    <input required={true} id="client-image-input" onChange={fileSelected} type="file" accept="image/*"></input>
                    <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="all-appointments-div">

                <div className="future-appointments-div">
                <h3>Upcoming Appointments</h3>
                { futureAppointments ? futureAppointments.sort((a, b) => {
                return Date.parse(a.date) - Date.parse(b.date)
                }).map(appointment => (
                    <div key={appointment._id} className="single-appointment-div">
                        <ul>
                        <li>{appointment.date}</li>
                        <li>{appointment.name}</li>
                        <li>{appointment.number}</li>
                        <li>{appointment.description}</li>
                        <img src={appointment.imagePath} alt="appointment inspiration" />
                        </ul>
                    </div>

                )) : <p>No upcoming appointments!</p>}
                </div>
                <div className="past-appointments-div">
                <h3>Previous Appointments</h3>
                { pastAppointments ? pastAppointments.sort((a, b) => {
                return  Date.parse(b.date) - Date.parse(a.date)
                }).map(appointment => (
                    <div key={appointment._id} className="single-appointment-div">
                        <ul>
                        <li>{appointment.date}</li>
                        <li>{appointment.name}</li>
                        <li>{appointment.number}</li>
                        <li>{appointment.description}</li>
                        <img src={appointment.imagePath} alt="appointment inspiration" />
                        </ul>
                    </div>

                )) : <p>No past appointments!</p>}
                </div>
                    
                </div>
            </div>
        )
    }
    else 
    return ( 
        <div className="my-profile">
            Hello, {dataFromDB.firstName}!
            <img className="profile-picture" src={dataFromDB.profilePicturePath} alt="profile" />
        </div>
     )
}

export default MyProfile