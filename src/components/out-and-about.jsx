import {useEffect, useState} from 'react'
import sanityClient from '../lib/sanityClient'

export default function OutAndAbout() {
  const [outAndAboutPhotos, setOutAndAboutPhotos] = useState([])

  useEffect(() => {
    const query = `*[_type == 'photo' && category == 'out-and-about'] {
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
        setOutAndAboutPhotos(data)
      })
      .catch((error) => {
        console.error('Sanity fetch error:', error)
      })
  }, [])

  return (
    <div className="photo-container">
      {outAndAboutPhotos.map((item, index) => (
        <div key={index} className="photo-item">
          {/* Ensure that item.photos is an object and not an array */}
          {item.image ? (
            <img
              src={item.image.asset.url}
              alt={item.title}
              style={{maxWidth: '100%', height: 'auto'}}
            />
          ) : (
            <p>No photos avaliable</p>
          )}
        </div>
      ))}
    </div>
  )
}