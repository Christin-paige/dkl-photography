import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import Wildlife from './components/wildlife';
import Astro from './components/astro';
import OutAndAbout from './components/out-and-about';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    const images = document.querySelectorAll('.photo-item img');
    const totalImages = images.length;
    let loadedImages = 0;

    const handleImageLoad = () => {
      loadedImages += 1;
      if (loadedImages === totalImages) {
        setAllImagesLoaded(true); // All images are loaded
      }
    };

    images.forEach((img) => {
      img.addEventListener('load', handleImageLoad);
    });

    // Cleanup event listeners when component unmounts
    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
      });
    };
  }, []);

  return (
    <>
      <NavBar />
      <div
        className={`content-wrapper ${allImagesLoaded ? 'content-visible' : 'content-hidden'}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Wildlife" element={<Wildlife />} />
          <Route path="/Astro" element={<Astro />} />
          <Route path="/out-and-about" element={<OutAndAbout />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
