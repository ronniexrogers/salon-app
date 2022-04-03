import { useState } from 'react'
import axios from 'axios'
import './CSS/App.css'
import { useNavigate } from 'react-router-dom'
import { FormGroup, Button, Input } from "reactstrap"


const AppointmentCreate = ({ userData }) => {

    const [file, setFile] = useState()
    const [description, setDescription] = useState("")
    const [clientName, setClientName] = useState("")
    const [number, setNumber] = useState("")
    const [images, setImages] = useState([])
    const [appointmentDate, setAppointmentDate] = useState('')
    const [email, setEmail] = useState('')
    const [appointmentTime, setAppointmentTime] = useState('')
    const userGoogleId = userData.googleId
    const modal = document.querySelector('.appointment-modal')
    const navigate = useNavigate()

    const postImage = async ({image, description, clientName, number, appointmentDate, appointmentTime, email, userGoogleId}) => {
      const formData = new FormData()
      formData.append("image", image)
      formData.append("description", description)
      formData.append("clientName", clientName)
      formData.append("number", number)
      formData.append("date", appointmentDate)
      formData.append("time", appointmentTime)
      formData.append("email", email)
      formData.append("googleId", userGoogleId)
      modal.style.display = "block"
      try {
        const result = await axios.post('https://ronnie-rogers-capstone-backend.herokuapp.com/api/appointments/createAppointment', formData, { 
          headers: {
          'Content-Type': 'multipart/form-data'}})
        return result.data 
      } catch(err) {
        console.log(err)
      }
    }
  
    const submit = async (e) => {
      e.preventDefault()
      const result = await postImage({image: file, description, clientName, number, appointmentDate, appointmentTime, email, userGoogleId})
      setImages([result, ...images])
    }
    const fileSelected = (e) => {
      const file = e.target.files[0]
          setFile(file)
      }

    const handleChange = (event) => {
        event.target.name==="name" 
      ? setClientName(event.target.value)
      : event.target.name==="number" 
      ? setNumber(event.target.value)
      : event.target.name==="email" 
      ? setEmail(event.target.value)
      : event.target.name==="description" 
      ? setDescription(event.target.value)
      : event.target.name==="date" 
      ? setAppointmentDate(event.target.value)
      : event.target.name==="time" 
      ? setAppointmentTime(event.target.value)
      : console.log("error")
    }

    return ( 
      <div className='appointment'>
      <h1>Book Appointment</h1>
        <div className='appointment-form'>
            <form id="clientUpload" onSubmit={submit}>
                <FormGroup>
                  <Input
                    required={true}
                    id="exampleDate"
                    name="date"
                    placeholder="01/01/2022"
                    type="date"
                    onChange={e => handleChange(e)} 
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    required={true}
                    id="exampleTime"
                    name="time"
                    placeholder="12:00 PM"
                    type="time"
                    onChange={e => handleChange(e)} 
                  />
                </FormGroup>
                <FormGroup>
                <Input 
                  required={true}
                  className="Input-text" 
                  name="name"
                  placeholder='Name' 
                  onChange={e => handleChange(e)} 
                  type="text">
                </Input>
                </FormGroup>
                <FormGroup>
                  <Input
                    required={true}
                    id="exampleEmail"
                    name="email"
                    placeholder="E-Mail"
                    type="text"
                    onChange={e => handleChange(e)} 
                  />
                </FormGroup>
                <FormGroup>
                <Input 
                  required={true}
                  name="number"
                  className="Input-text" 
                  placeholder='Phone Number' 
                  onChange={e => handleChange(e)} 
                  type="text">
                </Input>
                </FormGroup>
                <FormGroup>
                <Input 
                  name="description"
                  required={true}
                  className="Input-text" 
                  placeholder='Description of Service' 
                  onChange={e => handleChange(e)} 
                  type="text">
                </Input>
                </FormGroup>
                <FormGroup>
                <Input 
                  className="custom-file-input"
                  required={true}
                  id="client-image-Input" 
                  onChange={fileSelected} 
                  type="file" 
                  accept="image/*">
                </Input>
                </FormGroup>
                <Button type="submit" block color="success" size="lg">
                  Submit
                </Button>
            </form>
      </div>

      <div className='appointment-form-mobile'>
            <form id="clientUpload" onSubmit={submit}>
                <FormGroup>
                  Select Date
                  <Input
                    required={true}
                    id="exampleDate"
                    name="date"
                    placeholder="01/01/2022"
                    type="date"
                    onChange={e => handleChange(e)} 
                  />
                </FormGroup>
                <FormGroup>
                  Select Time
                  <Input
                    required={true}
                    id="exampleTime"
                    name="time"
                    placeholder="12:00 PM"
                    type="time"
                    onChange={e => handleChange(e)} 
                  />
                </FormGroup>
                <FormGroup>
                  Enter Name
                <Input 
                  required={true}
                  className="Input-text" 
                  name="name"
                  placeholder='Name' 
                  onChange={e => handleChange(e)} 
                  type="text">
                </Input>
                </FormGroup>
                <FormGroup>
                  Enter E-Mail
                  <Input
                    required={true}
                    id="exampleEmail"
                    name="email"
                    placeholder="E-Mail"
                    type="text"
                    onChange={e => handleChange(e)} 
                  />
                </FormGroup>
                <FormGroup>
                  Enter Phone Number
                <Input 
                  required={true}
                  name="number"
                  className="Input-text" 
                  placeholder='Phone Number' 
                  onChange={e => handleChange(e)} 
                  type="text">
                </Input>
                </FormGroup>
                <FormGroup>
                  Enter Service Description
                <Input 
                  name="description"
                  required={true}
                  className="Input-text" 
                  placeholder='Description of Service' 
                  onChange={e => handleChange(e)} 
                  type="text">
                </Input>
                </FormGroup>
                <FormGroup>
                  Attach Inspiration Photo
                <Input 
                  className="custom-file-input"
                  required={true}
                  id="client-image-Input" 
                  onChange={fileSelected} 
                  type="file" 
                  accept="image/*">
                </Input>
                </FormGroup>
                <Button type="submit" block color="success" size="lg">
                  Submit
                </Button>
            </form>
      </div>

          <div className="appointment-modal">
            <div className="modal-text">
            Thanks for booking with me! I'll be in touch soon to confirm your appointment.
            </div>
            <Button className='modal-button' block color="success" size="sm"  onClick={() => navigate('/')}>Close</Button>
          </div>
      </div>
     )
}
 
export default AppointmentCreate