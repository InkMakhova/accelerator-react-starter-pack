import { AppRoute, NavigationSection } from '../../../../../const';
import { Link } from 'react-router-dom';

type NavigationProps = {
  currentNavigationSection: string;
}

function Navigation({currentNavigationSection}: NavigationProps): JSX.Element {
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li>
          <Link
            className={
              `link main-nav__link
              ${currentNavigationSection === NavigationSection.Catalog ? 'link--current' : ''}`
            }
            to={AppRoute.Root}
            data-testid={NavigationSection.Catalog}
          >
            Каталог
          </Link>
        </li>
        <li>
          <Link
            className={
              `link main-nav__link
              ${currentNavigationSection === NavigationSection.WhereToBuy ? 'link--current' : ''}`
            }
            to={AppRoute.WhereToBuy}
            data-testid={NavigationSection.WhereToBuy}
          >
            Где купить?
          </Link>
        </li>
        <li>
          <Link
            className={
              `link main-nav__link
              ${currentNavigationSection === NavigationSection.AboutUs ? 'link--current' : ''}`
            }
            to={AppRoute.AboutUs}
            data-testid={NavigationSection.AboutUs}
          >
            О компании
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
