import { useEffect, useState } from "react"
import { UncontrolledCarousel, Col, CardTitle, CardText, Button, Card, Row } from "reactstrap"

const axios = require('axios')


const Gallery = () => {

    const [hairPhotos, setHairPhotos] = useState([])
    const [nailPhotos, setNailPhotos] = useState([])
    const [allPhotos, setAllPhotos] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/salonPhotos`)
        .then ((res) => {
            setAllPhotos(res.data)
        })
    }, [])

    useEffect(() => {
        setHairPhotos(allPhotos.filter(photo => (
            photo.type === 'hair'
        )))

        setNailPhotos(allPhotos.filter(photo => (
            photo.type === 'nails'
        )))
    }, [allPhotos])


    if(allPhotos === []) return (<p>loading...</p>)

    return ( 
        <div className="gallery">

            <Row>
            <Col sm="6">
                <h1>Hair</h1>
                {
                hairPhotos.map(photo => (
                <Card body>
                <CardText>
                <img key={photo._id} src={photo.imagePath} alt={photo.description} />
                </CardText>
                </Card>
                ))
                }

            </Col>
            <Col sm="6">
                <h1>Nails</h1>
                {
                nailPhotos.map(photo => (
                <Card body>
                <CardText>
                <img key={photo._id} src={photo.imagePath} alt={photo.description} />
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