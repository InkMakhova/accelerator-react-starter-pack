import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

function BreadCrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Root}>
          Главная
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Catalog}>Каталог</Link>
      </li>
    </ul>
  );
}

export default BreadCrumbs;
