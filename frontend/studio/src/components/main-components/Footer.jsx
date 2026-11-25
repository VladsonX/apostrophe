import { Link } from 'react-router';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='footer__wrapper'>
        <p className="footer__text">Made by <Link to="https://github.com/VladsonX" target="_blank" className='footer__link'>Uladzislau Navitski</Link></p>
        <p className="footer__text">Student of <Link to="https://pollub.pl/en/" target="_blank" className='footer__link'>Lublin University of Technology</Link></p>
    </div>
  )
}

export default Footer