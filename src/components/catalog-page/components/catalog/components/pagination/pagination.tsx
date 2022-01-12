import { useSelector } from 'react-redux';
import { getTotal } from '../../../../../../store/guitar-data/selectors';
import { AppRoute, ITEMS_PER_PAGE, PAGINATION_STEP } from '../../../../../../const';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Pagination(): JSX.Element {
  const location = useLocation();

  const totalGuitarNumber = useSelector(getTotal);
  const totalPageNumber = Math.ceil(totalGuitarNumber / ITEMS_PER_PAGE);

  let currentPage = 1;

  if (location.pathname.includes('page_')) {
    const splitPath = location.pathname
      .split('/')[location.pathname
        .split('/').length-1];

    currentPage = Number(splitPath[splitPath.length-1]
      .split('_')[splitPath[splitPath.length-1]
        .split('_').length-1]);
  } else {
    currentPage = 1;
  }

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
              >{key}
              </Link>
            </li>
          );
        });
      return pageNumbers;
    }
  };

  if (totalPageNumber === 0) {
    return <div className="pagination page-content__pagination"></div>;
  } else {
    return (
      <div className="pagination page-content__pagination">
        <ul className="pagination__list">
          {isPrevButton ?
            <li className="pagination__page pagination__page--prev" id="prev">
              <a className="link pagination__page-link" href="1">
                Назад
              </a>
            </li> : ''}
          {getPagination()}
          {isNextButton ?
            <li className="pagination__page pagination__page--next" id="next">
              <a className="link pagination__page-link" href="2">
                Назад
              </a>
            </li> : ''}
        </ul>
      </div>
    );
  }
}
export default Pagination;
