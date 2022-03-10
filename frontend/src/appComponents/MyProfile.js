import { useState, useEffect } from 'react'

const axios = require('axios')

const MyProfile = ({ dataFromDB }) => {
    const [appointments, setAppointments] = useState(null)
    const [description, setDescription] = useState(null)
    const [images, setImages] = useState([])
    const [file, setFile] = useState()

    useEffect(() => {
        axios.get(`http://localhost:5001/api/appointments`)
        .then ((res) => {
            setAppointments(res.data)
        })
    }, [])

    const postImage = async ({image, description}) => {
        const formData = new FormData();
        formData.append("image", image)
        formData.append("description", description)
        const result = await axios.post('/api/salonPhotos', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        console.log(result.data)
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
    

    if(dataFromDB.googleId === '114694917534994982394' || '110622259906074900624') {


        return (
            <div className="my-profile">
                <h1>Admin Dashboard</h1>
                <div className="admin-upload-div">
                    <h3>Upload to Gallery</h3>
                    <form id="admin-upload" onSubmit={submit}>
                    <input className="input-text" placeholder='Description of photo' onChange={e => setDescription(e.target.value)} type="text"></input>
                    <input id="client-image-input" onChange={fileSelected} type="file" accept="image/*"></input>
                    <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="all-appointments-div">
                    <h3>Appointments</h3>
                    { appointments ? appointments.map(appointment => (
                        <div key={appointment._id} className="single-appointment-div">
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
    } else 

    return ( 
        <div className="my-profile">
            Hello, {dataFromDB.firstName}!
            <img className="profile-picture" src={dataFromDB.profilePicturePath} alt="profile" />
        </div>
     );
}

export default MyProfile;