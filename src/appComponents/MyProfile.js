import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FormGroup, Input, ListGroup, ListGroupItem, Button } from "reactstrap"

const axios = require('axios')

const MyProfile = ({ dataFromDB, isLoggedIn }) => {


    if(!dataFromDB || !isLoggedIn) return (<p>oopsie, what're ya doin here?! You need to <Link to="/signin">sign in</Link> first!</p>)

    return ( 
        <div className="my-profile">
            Hello, {dataFromDB.firstName}!
            <img className="profile-picture" src={dataFromDB.profilePicturePath} alt="profile" />
        </div>
     )
}

export default MyProfile