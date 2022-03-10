import { useEffect, useState } from "react";
const axios = require('axios')

const Gallery = () => {

    const [salonPhotos, setSalonPhotos] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5001/api/salonPhotos`)
        .then ((res) => {
            setSalonPhotos(res.data)
        })
    }, [])

    console.log(salonPhotos)

    return ( 
        <div className="gallery">
            <h1>Gallery</h1>
            {
                salonPhotos.map(photo => (
                    <img key={photo._id} src={photo.imagePath} alt={photo.description} />
                ))
            }
        </div>
     );
}
 
export default Gallery;