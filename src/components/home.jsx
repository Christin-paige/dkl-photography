import {useState, useEffect} from 'react'
import sanityClient from '../lib/sanityClient'
import { useNavigate } from 'react-router-dom'
//import imageUrlBuilder from '@sanity/image-url'

// Set up the Sanity image URL builder
//const builder = imageUrlBuilder(sanityClient)

//function urlFor(source) {
  //return builder.image(source)
//}

export default function Home() {
  const [galleryData, setGalleryData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const query = `*[_type == 'gallery']{
      title,
      slug,
      photos{
        asset->{
        _id,
        url
        },
        alt
        },
    }`

    sanityClient
      .fetch(query)
      .then((data) => {
        console.log(data) // Check if photos are in the data
        setGalleryData(data)
      })
      .catch((error) => {
        console.error('Sanity fetch error:', error)
      })
  }, [])

  const handleClick = (slug) => {
    navigate(`/${slug}`);
  };

  return (
    <div>
      <div className="gallery-container">
        {galleryData.map((item, index) => (
          <div key={index} 
          className="galleryImage"
          onClick={() => handleClick(item.slug.current)}
          style={{ cursor: 'pointer' }}>
           
           <h2 className="galleryTitle">{item.title}</h2>
           
            {/* Ensure that item.photos is an object and not an array */}
            {item.photos ? (
              <img
                src={item.photos.asset.url}
                alt={item.title}
                style={{ maxWidth: '100%', height: 'auto' }}
                
              />
             
            ) : (
              <p>No photos available</p>
            )}
            
           
          </div>
        ))}
      </div>
    </div>
  )
}
