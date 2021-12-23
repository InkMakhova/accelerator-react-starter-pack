import Logo from '../logo/logo';
import SocialMedia from './components/social-media/social-media';
import AboutUs from './components/about-us/about-us';
import Info from './components/info/info';
import Contacts from './components/contacts/contacts';

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <Logo />
        <SocialMedia />
        <AboutUs />
        <Info />
        <Contacts />
      </div>
    </footer>
  );
}

export default Footer;
