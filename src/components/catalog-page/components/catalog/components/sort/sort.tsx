import { useEffect, useState } from 'react';
import { Order, QueryParam, Sort as SortType } from '../../../../../../const';
import { useQuery } from '../../../../../../hooks/use-query';
import { useHistory, useLocation } from 'react-router-dom';
import { resetLocationToFirstPage } from '../../../../../../util';

function Sort(): JSX.Element {
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  const [sort, setSort] = useState(
    Object.values(SortType).includes(query.get(QueryParam.SortParam) as SortType) ?
      query.get(QueryParam.SortParam) :
      SortType.Price);

  const [order, setOrder] = useState(
    Object.values(Order).includes(query.get(QueryParam.OrderParam) as Order) ?
      query.get(QueryParam.OrderParam) :
      Order.Asc);

  useEffect(() => {
    setSort(Object.values(SortType).includes(query.get(QueryParam.SortParam) as SortType) ?
      query.get(QueryParam.SortParam) :
      SortType.Price);
    setOrder(Object.values(Order).includes(query.get(QueryParam.OrderParam) as Order) ?
      query.get(QueryParam.OrderParam) :
      Order.Asc);
    /*eslint-disable-next-line*/
  }, [location.search]);

  const onClickHandler = (sortType: string, searchParam: string) => {
    query.set(searchParam, sortType);
    location.pathname = resetLocationToFirstPage(location.pathname);
    location.search = query.toString();
    history.push(`${location.pathname}?${location.search}`);
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={
            `catalog-sort__type-button
            ${sort === SortType.Price ? 'catalog-sort__type-button--active' : ''}`
          }
          aria-label="по цене"
          tabIndex={sort === SortType.Price ? -1 : 0}
          onClick={() => {
            onClickHandler(SortType.Price, QueryParam.SortParam);
          }}
        >по цене
        </button>
        <button
          className={
            `catalog-sort__type-button
            ${sort === SortType.Rating ? 'catalog-sort__type-button--active' : ''}`
          }
          aria-label="по популярности"
          tabIndex={sort === SortType.Rating ? -1 : 0}
          onClick={() => {
            onClickHandler(SortType.Rating, QueryParam.SortParam);
          }}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={
            `catalog-sort__order-button catalog-sort__order-button--up
            ${order === Order.Asc ? 'catalog-sort__order-button--active' : ''}`
          }
          aria-label="По возрастанию"
          tabIndex={order === Order.Asc ? -1 : 0}
          onClick={() => {
            onClickHandler(Order.Asc, QueryParam.OrderParam);
          }}
        >
        </button>
        <button
          className={
            `catalog-sort__order-button catalog-sort__order-button--down
            ${order === Order.Desc ? 'catalog-sort__order-button--active' : ''}`
          }
          aria-label="По убыванию"
          tabIndex={order === Order.Desc ? -1 : 0}
          onClick={() => {
            onClickHandler(Order.Desc, QueryParam.OrderParam);
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
