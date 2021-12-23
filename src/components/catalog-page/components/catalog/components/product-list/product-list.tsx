import {Guitar} from '../../../../../../types/guitar';
import ProductCard from './components/product-card/product-card';

type ItemListProps = {
  guitars: Guitar[],
  guitarCount: number,
}

function ProductList({guitars, guitarCount}: ItemListProps): JSX.Element {
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
    <div className="cards catalog__cards">
      <p>There is no data about guitars</p>
    </div>
  );
}

export default ProductList;
