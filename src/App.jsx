
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/navbar'
import Home from './components/home'
import About from './components/about'
import Wildlife from './components/wildlife'
import Astro from './components/astro'
import OutAndAbout from './components/out-and-about'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <div>
        <NavBar />
       
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Wildlife" element={<Wildlife />} />
            <Route path="/Astro" element={<Astro />} />
            <Route path="/OutAndAbout" element={<OutAndAbout />} />

          </Routes>
       
      
      </div>
    </>
  )
}

export default App