import { useEffect, useState } from 'react';
import sanityClient from '../lib/sanityClient';
import Modal from 'react-bootstrap/Modal';


export default function OutAndAbout() {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Store the currently selected photo
  const [outAndAboutPhotos, setOutAndAboutPhotos] = useState([]);

  useEffect(() => {
    const query = `*[_type == 'photo' && category == 'out-and-about'] {
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
        console.log(data); // Check if photos are in the data
        setOutAndAboutPhotos(data);
      })
      .catch((error) => {
        console.error('Sanity fetch error:', error);
      });
  }, []);

  const handleShow = (photo) => {
    setSelectedPhoto(photo); // Set the clicked photo
    setShow(true);
  };

  return (
    <div className="photo-container">
      {outAndAboutPhotos.map((item, index) => (
        <div key={index} className="photo-item">
          {/* Ensure that item.photos is an object and not an array */}
          {item.image ? (
            <img
              src={item.image.asset.url}
              alt={item.title}
              style={{ maxWidth: '100%', height: 'auto' }}
              onClick={() => handleShow(item.image.asset.url)}
            />
          ) : (
            <p>No photos avaliable</p>
          )}
          <Modal
            show={show}
            fullscreen={fullscreen}
            onHide={() => setShow(false)}
          >
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
      ))}
    </div>
  );
}
