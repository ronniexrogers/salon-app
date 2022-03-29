import { useNavigate } from "react-router-dom"
import { UncontrolledCarousel, Button } from "reactstrap"


const Home = () => {
    
    const navigate = useNavigate()

    return ( 
        <div className="home">
            <div className="welcome-div">
            <p>Welcome!</p>
            <div className="welcome-div-message">
            <h3>The official website for world renowned hair stylist & nail tech Denisse Morales.</h3>
            </div>
            </div>

            <UncontrolledCarousel className="homepage-carousel"
            items={[
                {
                altText: 'Slide 1',
                caption: '',
                key: 1,
                src: 'https://denisse-morales-bucket.s3.amazonaws.com/3f6289100527afa401c8f803dd0e39ef'
                },
                {
                altText: 'Slide 2',
                caption: '',
                key: 2,
                src: 'https://denisse-morales-bucket.s3.us-west-1.amazonaws.com/81c0cfdc5ed472424a73f70f30b4c17e'
                },
                {
                altText: 'Slide 3',
                caption: '',
                key: 3,
                src: 'https://denisse-morales-bucket.s3.us-west-1.amazonaws.com/d8f47353ac16494962def110cca77103'
                }
            ]}
            />

            <h2>Want to book an appointment?</h2>
            <Button className="home-button" onClick={() => navigate('/appointment')} >Book now</Button>
        </div>
     )
}

export default Home