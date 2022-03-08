import { useState } from 'react'
import axios from 'axios'
import './CSS/App.css'

const postImage = async ({image, description, clientName, number}) => {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)
  formData.append("clientName", clientName)
  formData.append("number", number)
  const result = await axios.post('/api/createAppointment', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}

const AppointmentCreate = () => {

    const [file, setFile] = useState()
    const [description, setDescription] = useState("")
    const [clientName, setClientName] = useState("")
    const [number, setNumber] = useState("")
    const [images, setImages] = useState([])
  
    const submit = async event => {
      event.preventDefault()
      const result = await postImage({image: file, description, clientName, number})
      setImages([result, ...images])
    }
    const fileSelected = event => {
      const file = event.target.files[0]
          setFile(file)
      }
    const resetForm = () => {
      document.getElementById('client-image-input').value=(null)
      document.querySelectorAll('input-text').value=(null)
    }

    return ( 
        <div>
            <form id="clientUpload" onSubmit={submit}>
                <input className="input-text" placeholder='Name' onChange={e => setClientName(e.target.value)} type="text"></input>
                <input className="input-text" placeholder='Phone Number' onChange={e => setNumber(e.target.value)} type="text"></input>
                <input className="input-text" placeholder='Description of Service' onChange={e => setDescription(e.target.value)} type="text"></input>
                <input id="client-image-input" onChange={fileSelected} type="file" accept="image/*"></input>
                <button onClick={resetForm} type="submit">Submit</button>
            </form>
      </div>
     )
}
 
export default AppointmentCreate;