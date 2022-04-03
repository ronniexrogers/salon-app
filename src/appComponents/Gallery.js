import { useEffect, useState } from "react"
import { UncontrolledCarousel, Col, CardTitle, CardText, Button, Card, Row } from "reactstrap"

const axios = require('axios')


const Gallery = ({ isAdmin }) => {

    const [hairPhotos, setHairPhotos] = useState([])
    const [nailPhotos, setNailPhotos] = useState([])
    const [allPhotos, setAllPhotos] = useState([])
    const deleteButton = document.querySelector('.gallery-delete')


    useEffect(() => {
        axios.get(`https://ronnie-rogers-capstone-backend.herokuapp.com/api/salonPhotos`)
        .then ((res) => {
            setAllPhotos(res.data)
        })

    }, [allPhotos])

    useEffect(() => {
        setHairPhotos(allPhotos.filter(photo => (
            photo.type === 'hair'
        )))

        setNailPhotos(allPhotos.filter(photo => (
            photo.type === 'nails'
        )))

    }, [allPhotos])

    const handleDeleteOne = (id) => {
        axios.delete(`https://ronnie-rogers-capstone-backend.herokuapp.com/api/salonPhotos/${id}`)
    }

    if(deleteButton) {
        isAdmin === true ? deleteButton.style.display = "block" : deleteButton.style.display = "none"
    }

    return ( 
        <div className="gallery">

            <Row>
            <Col sm="6">
                <h1>Hair</h1>
                {
                hairPhotos.map((photo, index) => (
                <Card key={index} body>
                <CardText>
                <img key={photo._id} src={photo.imagePath} alt={photo.description} />
                <Button className="gallery-delete" color="danger" size="sm" onClick={() => handleDeleteOne(photo._id)}>Delete Photo</Button>
                </CardText>
                </Card>
                ))
                }

            </Col>
            <Col sm="6">
                <h1>Nails</h1>
                {
                nailPhotos.map((photo, index) => (
                <Card key={index} body>
                <CardText>
                <img key={photo._id} src={photo.imagePath} alt={photo.description} />
                <Button className="gallery-delete" color="danger" size="sm" onClick={() => handleDeleteOne(photo._id)}>Delete Photo</Button>
                </CardText>
                </Card>
                ))
                }
                </Col>
            </Row>
        </div>
     )
}
 
export default Gallery