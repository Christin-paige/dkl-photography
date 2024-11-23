import { useState, useEffect } from 'react';
import sanityClient from '../lib/sanityClient';

export default function About() {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const query = `*[_type == 'about']{
        title,
        slug,
        biography,
        profileImage{
          asset->{
          _id,
          url
          },
          alt
          },
         
      }`;

    sanityClient
      .fetch(query)
      .then((data) => {
        console.log(data); // Check if photos are in the data
        setAboutData(data);
      })
      .catch((error) => {
        console.error('Sanity fetch error:', error);
      });
  }, []);

  return (
    <>
      <div className="about-container">
        {aboutData.map((item, index) => (
          <div key={index} className="aboutImage">
            <div className="title-container">
              <h2 className="aboutTitle">{item.title}</h2>
              <p>{item.biography}</p>
            </div>
            {item.profileImage ? (
              <img
                src={item.profileImage.asset.url}
                alt={item.title}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            ) : (
              <p>No photos available</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
