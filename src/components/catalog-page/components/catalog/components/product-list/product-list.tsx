import { Guitar } from '../../../../../../types/guitar';
import ProductCard from './components/product-card/product-card';
import { useQuery } from '../../../../../../hooks/use-query';
import { useHistory, useLocation } from 'react-router-dom';
import { resetLocationToFirstPage } from '../../../../../../util';

type ItemListProps = {
  guitars: Guitar[],
  guitarCount: number,
}

function ProductList({guitars, guitarCount}: ItemListProps): JSX.Element {
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  if (guitars && guitars.length > 0) {
    const cards = guitars.length <= guitarCount ? guitars : guitars.slice(0, guitarCount);

    return (
      <div className="cards catalog__cards">
        {cards.map((card) => {
          const key = card.id;
          return (<ProductCard guitar={card} key={key}/>);
        })}
      </div>
    );
  }
  return (
    <div>
      <p>По вашим параметрам ничего не найдено. Попробуйте сбросить фильтры.</p>
      <button
        style={{cursor: 'pointer', color: '#c90606', border: 'none', background: 'transparent'}}
        onClick={(evt) => {
          evt.preventDefault();
          query.delete('price_gte');
          query.delete('price_lte');
          query.delete('type[]');
          query.delete('stringCount[]');
          location.pathname = resetLocationToFirstPage(location.pathname);
          location.search = query.toString();
          history.push(`${location.pathname}?${location.search}`);
        }}
      >Сбросить фильтры
      </button>
    </div>
  );
}

export default ProductList;
