type PageNumberProps = {
  pageNumber: number,
  currentPage: number,
}

function Pagination({pageNumber, currentPage}: PageNumberProps): JSX.Element {
  if (pageNumber <= 0 ) {
    return (
      <div></div>
    );
  } else {
    const pages = new Array(pageNumber).fill(null);

    return (
      <div className="pagination page-content__pagination">
        <ul className="pagination__list">
          {pages.map((_page, index) => {
            const key = index+1;

            return (
              <li
                key={key}
                className={`pagination__page ${currentPage === index+1 ? 'pagination__page--active' : ''}`}
              >
                <a className="link pagination__page-link" href={String(index+1)}>{index+1}</a>
              </li>
            );
          },
          )}
        </ul>
      </div>
    );
  }
}
export default Pagination;
