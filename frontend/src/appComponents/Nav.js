import { Link } from "react-router-dom";

const Nav = ({ isLoggedIn }) => {

    if(isLoggedIn){
        return ( 
            <div className="nav">
                <nav>
                    <Link to="/">Home </Link> |
                    <Link to="/appointment"> Create Appointment </Link> |
                    <Link to="/gallery"> Gallery </Link> |
                    <Link to="/about"> About </Link> |
                    <Link to="/contact"> Contact Us </Link> |
                    <Link to="/signin"> Sign Out </Link>
                </nav>
            </div>
         ); 
    }
    return ( 
        <div className="nav">
            <nav>
                <Link to="/">Home </Link> |
                <Link to="/appointment"> Create Appointment </Link> |
                <Link to="/gallery"> Gallery </Link> |
                <Link to="/about"> About </Link> |
                <Link to="/contact"> Contact Us </Link>
            </nav>
        </div>
     );
}
 
export default Nav;
