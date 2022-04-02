import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FormGroup, Input, ListGroup, ListGroupItem, Button } from "reactstrap"
import Admin from './Admin'

const MyProfile = ({ dataFromDB, isLoggedIn, isAdmin }) => {

    if(!dataFromDB || !isLoggedIn){
        return (<p>oopsie, what're ya doin here?! You need to <Link to="/signin">sign in</Link> first!</p>
        )}
    else if(!isAdmin){
        return (
            <div className="my-profile">
            Hello, {dataFromDB.firstName}!
            <img className="profile-picture" src={dataFromDB.profilePicturePath} alt="profile" />
        </div>
        )
    }else{
         return ( 
            <Admin />
     )}
}

export default MyProfile