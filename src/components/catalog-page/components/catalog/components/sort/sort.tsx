import {useState} from 'react';
import {Order, Sort as SortType} from '../../../../../../const';
import {useQuery} from '../../../../../../hooks/use-query';
import {useHistory} from 'react-router-dom';

function Sort(): JSX.Element {
  const query = useQuery();

  const history = useHistory();

  const [sort, setSort] = useState(Object.values(SortType).includes(query.get('_sort') as SortType) ? query.get('_sort') : SortType.Price);
  const [order, setOrder] = useState(Object.values(Order).includes(query.get('_order') as Order) ? query.get('_order') : Order.Asc);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${sort === SortType.Price ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={sort === SortType.Price ? -1 : 0}
          onClick={() => {
            setSort(SortType.Price);
            if (!query.get('sort')) {
              history.push(`?_sort=${SortType.Price}&_order=${order}`);
            }
            query.set('sort', SortType.Price);
          }}
        >по цене
        </button>
        <button
          className={`catalog-sort__type-button ${sort === SortType.Rating ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          tabIndex={sort === SortType.Rating ? -1 : 0}
          onClick={() => {
            setSort(SortType.Rating);
            if (!query.get('sort')) {
              history.push(`?_sort=${SortType.Rating}&_order=${order}`);
            }
            query.set('sort', SortType.Rating);
          }}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${order === Order.Asc ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={order === Order.Asc ? -1 : 0}
          onClick={() => {
            setOrder(Order.Asc);
            if (!query.get('order')) {
              history.push(`?_sort=${sort}&_order=${Order.Asc}`);
            }
            query.set('order', Order.Asc);
          }}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${order === Order.Desc ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          tabIndex={order === Order.Desc ? -1 : 0}
          onClick={() => {
            setOrder(Order.Desc);
            if (!query.get('order')) {
              history.push(`?_sort=${sort}&_order=${Order.Desc}`);
            }
            query.set('order', Order.Desc);
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
