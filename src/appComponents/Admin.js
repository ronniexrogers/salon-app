import { useEffect, useState } from "react"
import { FormGroup, Input, ListGroup, ListGroupItem, Button } from "reactstrap"



const Admin = ({ appointments }) => {

    // const [appointments, setAppointments] = useState([])
    const [description, setDescription] = useState(null)
    const [type, setType] = useState('hair')
    const [images, setImages] = useState([])
    const [file, setFile] = useState()
    const [pastAppointments, setPastAppointments] = useState([])
    const [futureAppointments, setFutureAppointments] = useState([])
    const todaysDate = new Date().valueOf()
    const modal = document.querySelector('.admin-modal')
    const axios = require('axios')

    const handleDeleteOne = (id) => {
        axios.delete(`https://ronnie-rogers-capstone-backend.herokuapp.com/api/appointments/${id}`)
    }

    const postImage = async ({image, description}) => {
        modal.style.display = "block"
        const formData = new FormData()
        formData.append("image", image)
        formData.append("description", description)
        formData.append("type", type)
        const result = await axios.post('https://ronnie-rogers-capstone-backend.herokuapp.com/api/salonPhotos', formData, { 
            headers: {
                'Content-Type': 'multipart/form-data'}})
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
    const typeSelected = (e) => {
    const inputValue = e.target.value
    setType(inputValue)
    }

    useEffect(() => {
        setFutureAppointments(appointments.filter(appointment => Date.parse(appointment.date) > todaysDate))
        setPastAppointments(appointments.filter(appointment => Date.parse(appointment.date) < todaysDate))
    }, [appointments])

        return (
            <div className="my-profile">
                <h1>Admin Dashboard</h1>
                <div className="admin-upload-div">
                    <h2>Upload to Gallery</h2>
                    <form id="admin-upload" onSubmit={submit}>
                    <h4>Description of service</h4>
                    <FormGroup>
                        <Input 
                        name="description"
                        className="Input-text" 
                        placeholder='Description of Service' 
                        onChange={e => setDescription(e.target.value)}
                        type="text">
                        </Input>
                    </FormGroup>
                    <h4>Type of service</h4>
                    <FormGroup>
                        <Input
                        id="select"
                        name="select"
                        type="select"
                        onChange={typeSelected}
                        >
                        <option value={"hair"}>
                            Hair
                        </option>
                        <option value={"nails"}>
                            Nails
                        </option>
                        </Input>
                    </FormGroup>

                    <h4>Select image</h4>
                    <FormGroup>
                        <Input 
                        id="salon-image-input" 
                        onChange={fileSelected} 
                        type="file" 
                        accept="image/*">
                        </Input>
                    </FormGroup>

                    <Button block color="success" size="sm" type="submit">Submit</Button>
                    </form>
                </div>
                <div className="admin-modal">
                    Picture added!
                    <Button className='modal-button' block color="success" size="sm"  onClick={() => modal.style.display = "none"}>Close</Button>
                </div>
                <div className="all-appointments-div">

                <div className="future-appointments-div">
                <h2>Upcoming Appointments</h2>
                { futureAppointments ? futureAppointments.sort((a, b) => {
                return Date.parse(a.date) - Date.parse(b.date)
                }).map(appointment => (
                    <div key={appointment._id} className="single-appointment-div">
                        <ListGroup>
                       <ListGroupItem color="success">Date: {appointment.date}</ListGroupItem>
                        <ListGroupItem>Time: {appointment.time}</ListGroupItem>
                        <ListGroupItem>Client Name: {appointment.name}</ListGroupItem> 
                        <ListGroupItem>Client Phone Number: {appointment.number}</ListGroupItem>
                        <ListGroupItem>Client E-Mail: {appointment.email}</ListGroupItem>
                        <ListGroupItem>Description: {appointment.description}</ListGroupItem>
                        <ListGroupItem><img src={appointment.imagePath} alt="appointment inspiration" /></ListGroupItem>
                        <ListGroupItem>  <Button color="danger" size="sm" onClick={() => handleDeleteOne(appointment._id)}>Delete Appointment</Button></ListGroupItem>
                        </ListGroup>
                    </div>

                )) : <p>No upcoming appointments!</p>}
                </div>
                <div className="past-appointments-div">
                <h2>Previous Appointments</h2>
                { pastAppointments ? pastAppointments.sort((a, b) => {
                return  Date.parse(b.date) - Date.parse(a.date)
                }).map(appointment => (
                    <div key={appointment._id} className="single-appointment-div">
                        <ListGroup>
                        <ListGroupItem color="warning">Date: {appointment.date}</ListGroupItem>
                        <ListGroupItem>Time: {appointment.time}</ListGroupItem>
                        <ListGroupItem>Client Name: {appointment.name}</ListGroupItem> 
                        <ListGroupItem>Client Phone Number: {appointment.number}</ListGroupItem>
                        <ListGroupItem>Client E-Mail: {appointment.email}</ListGroupItem>
                        <ListGroupItem>Description: {appointment.description}</ListGroupItem>
                        <ListGroupItem><img src={appointment.imagePath} alt="appointment inspiration" /></ListGroupItem>
                        <ListGroupItem>  <Button color="danger" size="sm" onClick={() => handleDeleteOne(appointment._id)}>Delete Appointment</Button></ListGroupItem>
                        </ListGroup>
                    </div>

                )) : <p>No past appointments!</p>}
                </div>    
            </div>
        </div>
    )
}
 
export default Admin;