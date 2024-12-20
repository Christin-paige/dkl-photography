import { BsInstagram } from "react-icons/bs";

export default function Footer () {
    return(
        <>
        <div className="footer-container">
        <img alt="dkl-photography" src="/images/dkl-footer.jpeg" className="footer-logo" />{' '}
       
        <a href="https://www.instagram.com/dkl.24/" target="_blank" rel="noopener noreferrer" aria-label="Follow DKL Photography on Instagram">
          <BsInstagram className="instagram" size={25}/>
          </a>
        </div>
        </>
    )
}