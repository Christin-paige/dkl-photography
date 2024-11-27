import { useEffect, useState } from 'react';
import sanityClient from '../lib/sanityClient';
import Modal from 'react-bootstrap/Modal';

export default function Wildlife() {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [wildlifePhotos, setWildlifePhotos] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    const query = `*[_type == 'photo' && category == 'wildlife'] {
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
        setWildlifePhotos(data);
      })
      .catch((error) => {
        console.error('Sanity fetch error:', error);
      });
  }, []);

  const handleShow = (photo) => {
    setSelectedPhoto(photo); // Set the clicked photo
    setShow(true);
  };
  const handleImageLoad = () => {
    const loadedImages = document.querySelectorAll('.photo-item img.loaded');
    if (loadedImages.length === wildlifePhotos.length) {
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
      {wildlifePhotos.map((item, index) => (
        <div key={index} className="photo-item">
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
            <p>No photos avaliable</p>
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
