import { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { useNavigate } from "react-router-dom"
import { FormGroup, Input, Button } from "reactstrap"

const axios = require('axios')

const Contact = () => {
    const formId = 'oiGzOy4X'
    const formSparkUrl = `https://submit-form.com/${formId}`
    const recaptchaKey = '6Lc8OM0eAAAAAAiIrWubEZ1pwbl9HaPtinQLrS0N'
    const recaptchaRef = useRef()
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [recaptchaToken, setRecaptchaToken] = useState('')
    const modal = document.querySelector('.contact-modal')
    const navigate = useNavigate()

    const updateRecaptchaToken = (token) => {
        setRecaptchaToken(token)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await postSubmission()
    }

    const postSubmission = async () => {
        const formData = {
            name: name,
            email: email,
            phoneNumber: number,
            message: message,
            "g-recaptcha-response": recaptchaToken
        }
        try {
            await axios.post(formSparkUrl, formData)
            recaptchaRef.current.reset()
            modal.style.display = "block"
        }catch(err) {
            alert(err)
        }
    }

    const handleToggleModal = () => {
    if(modal.style.display === 'none') {
        modal.style.display = "block"
    } else{modal.style.display = "none"}
    }

    return ( 
        <div className="contact">
        <h1 className="contact-form-header">Contact Me</h1>
        <div className="contact-form">
            <form onSubmit={ handleSubmit }>
                <FormGroup>
                <Input 
                  id="name" 
                  name="name"
                  placeholder='Name' 
                  onChange={(e) => setName(e.target.value)}
                  type="text" >
                </Input>
                </FormGroup>
                <FormGroup>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="E-Mail"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                <Input 
                  name="number"
                  className="Input-text" 
                  placeholder='Phone Number' 
                  onChange={(e) => setNumber(e.target.value)}
                  type="text">
                </Input>
                </FormGroup>
                <FormGroup>
                <Input 
                  name="message"
                  className="Input-text" 
                  placeholder='Enter your message here!' 
                  onChange={(e) => setMessage(e.target.value)}
                  type="text">
                </Input>
                </FormGroup>
                <ReCAPTCHA 
                ref={recaptchaRef}
                sitekey={recaptchaKey}
                onChange={updateRecaptchaToken}
                />
                  <Button block color="success" size="lg" onClick={() => handleToggleModal()} type="submit">Submit</Button>
            </form>
            <div className="contact-modal">
                Thanks for contacting me! I'll be in touch soon.
                  <Button block color="success" size="lg" onClick={() => navigate('/')}>Close</Button>
            </div>

        </div>
        </div>
     )
}
 
export default Contact