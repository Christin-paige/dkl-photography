import {useEffect, useState} from 'react'
import sanityClient from '../lib/sanityClient'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default function Wildlife() {
  const [wildlifePhotos, setWildlifePhotos] = useState([])

  useEffect(() => {
    const query = `*[_type == 'photo' && category == 'wildlife'] {
          title,
          image {
            asset->{
            _id,
            url
            }
    }
        }`

    sanityClient
      .fetch(query)
      .then((data) => {
        console.log(data) // Check if photos are in the data
        setWildlifePhotos(data)
      })
      .catch((error) => {
        console.error('Sanity fetch error:', error)
      })
  }, [])

  return (
    <Container>
      <Row>
    
          <div className="photo-container">
          
            {wildlifePhotos.map((item, index) => (
               
              <div key={index} className="photo-item">
               
                {/* Ensure that item.photos is an object and not an array */}
                {item.image ? (
                  <img src={item.image.asset.url} alt={item.title} className="img-fluid" />
                ) : (
                  <p>No photos avaliable</p>
                )}
              </div>
            
            ))}
          </div>
      </Row>
    </Container>
  )
}
