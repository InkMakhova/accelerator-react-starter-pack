import Logo from '../logo/logo';
import Navigation from './components/navigation/navigation';
import Search from './components/search/search';
import Cart from './components/cart/cart';

type HeaderProps = {
  currentNavigationSection: string;
}

function Header({currentNavigationSection}: HeaderProps): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Logo />
        <Navigation currentNavigationSection={currentNavigationSection}/>
        <Search />
        <Cart />
      </div>
    </header>
  );
}

export default Header;
