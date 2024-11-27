import { useEffect, useState } from 'react';
import sanityClient from '../lib/sanityClient';
import Modal from 'react-bootstrap/Modal';

export default function Astro() {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [astroPhotos, setAstroPhotos] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    const query = `*[_type == 'photo' && category == 'astro'] {
              title,
              image {
                asset->{
                _id,
                url
                }
        }
            }`;

    sanityClient
      .fetch(query)
      .then((data) => {
        setAstroPhotos(data);
      })
      .catch((error) => {
        console.log('Sanity fetch error:', error);
      });
  }, []);

  const handleShow = (photo) => {
    setSelectedPhoto(photo); // Set the clicked photo
    setShow(true);
  };
  const handleImageLoad = () => {
    const loadedImages = document.querySelectorAll('.photo-item img.loaded');
    if (loadedImages.length === astroPhotos.length) {
      setAllLoaded(true); // Set to true once all images have loaded
    }
  };

  return (
    <div
      className="photo-container"
      style={{
        opacity: allLoaded ? 1 : 0, // Show only after all images load
        transition: 'opacity 1s ease-in-out',
      }}
    >
      {astroPhotos.map((item, index) => (
        <div key={index} className="photo-item">
          {/* Ensure that item.photos is an object and not an array */}
          {item.image ? (
            <img
              src={item.image.asset.url}
              alt={item.title}
              className="loaded"
              style={{ maxWidth: '100%', height: 'auto' }}
              onLoad={handleImageLoad}
              onClick={() => handleShow(item.image.asset.url)}
            />
          ) : (
            <p>No photos to available</p>
          )}
        </div>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: 'black',
            borderBottom: 'none',
          }}
        ></Modal.Header>
        <Modal.Body style={{ backgroundColor: 'black', padding: 0 }}>
          {selectedPhoto && (
            <img
              src={selectedPhoto}
              alt="Full-screen"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
