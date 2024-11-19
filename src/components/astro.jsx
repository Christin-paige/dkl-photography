import {useEffect, useState} from 'react'
import sanityClient from '../lib/sanityClient'

export default function Astro() {
  const [astroPhotos, setAstroPhotos] = useState([])

  useEffect(() => {
    const query = `*[_type == 'photo' && category == 'astro'] {
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
        console.log(data)
        setAstroPhotos(data)
      })
      .catch((error) => {
        console.log('Sanity fetch error:', error)
      })
  }, [])

  return (
    <div className="photo-container">
      {astroPhotos.map((item, index) => (
        <div key={index} className="photo-item">
          {/* Ensure that item.photos is an object and not an array */}
          {item.image ? (
            <img
              src={item.image.asset.url}
              alt={item.title}
              style={{maxWidth: '100%', height: 'auto'}}
            />
          ) : (
            <p>No photos to available</p>
          )}
        </div>
      ))}
    </div>
  )
}