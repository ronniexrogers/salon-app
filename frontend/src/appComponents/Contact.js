import { FormEvent, useState } from "react"
const axios = require('axios')

const Contact = () => {
    const formId = 'oiGzOy4X'
    const formSparkUrl = `https://submit-form.com/${formId}`
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await postSubmission()
    }

    const postSubmission = async () => {
        const formData = {
            name: name,
            email: email,
            phoneNumber: number,
            message: message
        }
        try {
            await axios.post(formSparkUrl, formData)
        }catch(err) {
            console.log(err)
        }
    }

    return ( 
        <div className="contact-form">
            Yo, I'm the contact page.
            <form onSubmit={ handleSubmit }>
                <input type="text" required={true} name="name" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
                <input type="text" required={true} name="number" placeholder="Number" onChange={(e) => setNumber(e.target.value)}></input>
                <input type="text" required={true} name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                <input type="text" required={true} name="message" placeholder="Message" onChange={(e) => setMessage(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
     );
}
 
export default Contact;