import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'
import Admin from './Admin'
const axios = require('axios')

const MyProfile = ({ dataFromDB, isLoggedIn, isAdmin }) => {

    const [appointments, setAppointments] = useState([])
    const [userAppointments, setUserAppointments] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])
    const [futureAppointments, setFutureAppointments] = useState([])
    const todaysDate = new Date().valueOf()

    useEffect(() => {
        axios.get(`https://ronnie-rogers-capstone-backend.herokuapp.com/api/appointments`)
        .then ((res) => {
            setAppointments(res.data)
            setUserAppointments(appointments.filter(appointment => appointment.googleId === dataFromDB.googleId))
        })
    }, [appointments])

    useEffect(() => {
        console.log(userAppointments)
        console.log(appointments)
        console.log(dataFromDB)
        // setUserAppointments(appointments.filter(appointment => appointment.googleId === dataFromDB.googleId))
        console.log(userAppointments)
    }, [])

    useEffect(() => {
        setFutureAppointments(userAppointments.filter(appointment => Date.parse(appointment.date) > todaysDate))
        setPastAppointments(userAppointments.filter(appointment => Date.parse(appointment.date) < todaysDate))
    }, [userAppointments])

    if(!dataFromDB || !isLoggedIn){
        return (<p>oopsie, what're ya doin here?! You need to <Link to="/signin">sign in</Link> first!</p>
        )}
    else if(!isAdmin){
        return (
            <div className="my-profile">
            Hello, {dataFromDB.firstName}!
            <img className="profile-picture" src={dataFromDB.profilePicturePath} alt="profile" />
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
                        </ListGroup>
                    </div>

                )) : <p>No past appointments!</p>}
                </div>    
        </div>
        )
    }else{
         return ( 
            <Admin appointments={ appointments } />
     )}
}

export default MyProfile