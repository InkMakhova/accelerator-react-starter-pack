import { AppRoute, PAGINATION_STEP } from '../../../../../../const';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getCurrentPage } from '../../../../../../util';

type PaginationProps = {
  totalPageNumber: number;
}

function Pagination({totalPageNumber}: PaginationProps): JSX.Element {
  const location = useLocation();

  const currentPage = getCurrentPage(location.pathname);

  const position = Math.ceil(currentPage / PAGINATION_STEP);
  const positionStart = position * PAGINATION_STEP - (PAGINATION_STEP - 1);
  const positionEnd = position * PAGINATION_STEP;

  const isPrevButton = positionStart !== 1;
  const isNextButton = positionEnd < totalPageNumber;

  const getPagination = () => {
    if (totalPageNumber >= positionStart && totalPageNumber <= positionEnd) {

      const pageNumbers = new Array(totalPageNumber - positionStart + 1)
        .fill(null)
        .map((_number, index) => {
          const key = positionStart + index;

          return (
            <li
              key={key}
              className={`pagination__page ${currentPage === key ? 'pagination__page--active' : ''}`}
            >
              <Link
                className="link pagination__page-link"
                to={`${AppRoute.Catalog}${AppRoute.Page}${key}${location.search}`}
                data-testid={key}
              >{key}
              </Link>
            </li>
          );
        });
      return pageNumbers;
    } else {
      const pageNumbers = new Array(PAGINATION_STEP)
        .fill(null)
        .map((_number, index) => {
          const key = positionStart + index;

          return (
            <li
              key={key}
              className={`pagination__page ${currentPage === key ? 'pagination__page--active' : ''}`}
            >
              <Link
                className="link pagination__page-link"
                to={`${AppRoute.Catalog}${AppRoute.Page}${key}${location.search}`}
                data-testid={key}
              >{key}
              </Link>
            </li>
          );
        });
      return pageNumbers;
    }
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {isPrevButton ?
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link
              className="link pagination__page-link"
              to={`${AppRoute.Catalog}${AppRoute.Page}${positionStart - 1}${location.search}`}
              data-testid="prev"
            >Назад
            </Link>
          </li> : ''}
        {getPagination()}
        {isNextButton ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link
              className="link pagination__page-link"
              to={`${AppRoute.Catalog}${AppRoute.Page}${positionEnd + 1}${location.search}`}
              data-testid="next"
            >Вперед
            </Link>
          </li> : ''}
      </ul>
    </div>
  );
}

export default Pagination;
