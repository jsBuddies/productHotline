import React from 'react';
import classes from './Footer.css';

const Footer = () => {
    return <footer>
        <p className="footer__copy">
        &copy;2018 <a href="http://www.sandytian.ca/" className="footer__copy__link" target="_blank">Sandy Tian</a> and <a href="https://jackielealess.com" className="footer__copy__link" target="_blank">Jackie Lealess</a>
        </p>
      </footer>;
}

export default Footer;