import { useState } from 'react'
import axios from 'axios'
import './CSS/App.css'
import DateTimePicker from 'react-datetime-picker'
import { useNavigate } from 'react-router-dom'
import { FormGroup, Button, Modal, ModalFooter, ModalBody, ModalHeader, Input } from "reactstrap"


const AppointmentCreate = ({ userData }) => {

    const [file, setFile] = useState()
    const [description, setDescription] = useState("")
    const [clientName, setClientName] = useState("")
    const [number, setNumber] = useState("")
    const [images, setImages] = useState([])
    const [appointmentDate, setAppointmentDate] = useState('')
    const [appointmentTime, setAppointmentTime] = useState('')
    const [modalShowing, setModalShowing] = useState(false)
    const modal = document.querySelector('.appointment-modal')
    const navigate = useNavigate()

    const postImage = async ({image, description, clientName, number, appointmentDate, appointmentTime}) => {
      const formData = new FormData()
      formData.append("image", image)
      formData.append("description", description)
      formData.append("clientName", clientName)
      formData.append("number", number)
      formData.append("date", appointmentDate)
      formData.append("time", appointmentTime)
      try {
        const result = await axios.post('http://localhost:8080/api/appointments/createAppointment', formData, { 
          headers: {
          'Content-Type': 'multipart/form-data'}})
        return result.data 
      } catch(err) {
        alert(err)
      }
    }
  
    const submit = async (e) => {
      e.preventDefault()
      const result = await postImage({image: file, description, clientName, number, appointmentDate, appointmentTime})
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
      : event.target.name==="description" 
      ? setDescription(event.target.value)
      : event.target.name==="date" 
      ? setAppointmentDate(event.target.value)
      : event.target.name==="time" 
      ? setAppointmentTime(event.target.value)
      : console.log("error")
    }

    const handleToggleModal = () => {
      // setModalShowing(!modalShowing)
      if(modal.style.display === 'none') {
        modal.style.display = "block"
      } else{modal.style.display = "none"}
    }


    return ( 
        <div>
            <h1>Book Appointment</h1>
            <form id="clientUpload" onSubmit={submit}>
                <FormGroup>
                  <Input
                    required={true}
                    id="exampleDate"
                    name="date"
                    placeholder="date placeholder"
                    type="date"
                    onChange={e => handleChange(e)} 
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    required={true}
                    id="exampleTime"
                    name="time"
                    placeholder="time placeholder"
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
                    type="email"
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
                  required={true}
                  id="client-image-Input" 
                  onChange={fileSelected} 
                  type="file" 
                  accept="image/*">
                </Input>
                </FormGroup>
                <Button
                  color="danger"
                  type="submit"
                  onClick={() => handleToggleModal()} 
                >
                  Submit
                </Button>
            </form>

          <div>
            <Modal
              centered
              fullscreen="lg"
              size="lg"
              toggle={function noRefCheck(){handleToggleModal()}}
            >
              <ModalHeader toggle={function noRefCheck(){}}>
                Modal title
              </ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={function noRefCheck(){}}
                >
                  Do Something
                </Button>
                {' '}
                <Button onClick={function noRefCheck(){}}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>


          <div className="appointment-modal">
            Thanks for booking with me! I'll be in touch soon to confirm your appointment.
            <button onClick={() => navigate('/')}>Close</button>
          </div>
      </div>
     )
}
 
export default AppointmentCreate