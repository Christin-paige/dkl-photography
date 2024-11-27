import { useState, useEffect } from 'react';
import sanityClient from '../lib/sanityClient';
import { useNavigate } from 'react-router-dom';



export default function Home() {
  const [galleryData, setGalleryData] = useState([]);
  const navigate = useNavigate();
 

  useEffect(() => {
    const query = `*[_type == 'gallery']{
      title,
      slug,
      order,
      photos{
        asset->{
        _id,
        url
        },
        alt,
        },
    }`;

    sanityClient
      .fetch(query)
      .then((data) => {
        // Sort galleries by order (ascending to descending)
        const sortedData = data.sort((a, b) => a.order - b.order);
        setGalleryData(sortedData);
      })
      .catch((error) => {
        console.error('Sanity fetch error:', error);
      });
  }, []);

 

  const handleClick = (slug) => {
    navigate(`/${slug}`);
  };

 
  return (
    <div>
      <div className="gallery-container">
        <div className="loader">
        {galleryData.map((item, index) => (
          <div
            key={index}
            className="galleryImage"
            onClick={() => handleClick(item.slug.current)}
            style={{ cursor: 'pointer' }}
          >
          

            <h2 className="galleryTitle">{item.title}</h2>

            {item.photos ? (
              <img
                src={item.photos.asset.url}
                alt={item.title}
               
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  transition: 'opacity 0.5s ease-in-out',
                }}
              />
            ) : (
              <p>No photos available</p>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
