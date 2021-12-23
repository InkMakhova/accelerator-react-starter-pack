import {AppRoute} from '../../../../../const';
import {Link} from 'react-router-dom';

function Navigation(): JSX.Element {
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li>
          <Link
            className="link main-nav__link link--current"
            to={AppRoute.Root}
          >
            Каталог
          </Link>
        </li>
        <li>
          <Link
            className="link main-nav__link"
            to={AppRoute.WhereToBuy}
          >
            Где купить?
          </Link>
        </li>
        <li>
          <Link
            className="link main-nav__link"
            to={AppRoute.AboutUs}
          >
            О компании
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
