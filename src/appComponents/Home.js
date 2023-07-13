import { useNavigate } from "react-router-dom"
import { UncontrolledCarousel, Button } from "reactstrap"


const Home = () => {

    const navigate = useNavigate()

     return (
        <div className="home">
        <div className="welcome-div">
        <p>Welcome!</p>
        <div className="welcome-div-message">
        <h3>This site is currently being rebuilt!</h3>
        </div>
        </div>
        </div>
     )
}

export default Home