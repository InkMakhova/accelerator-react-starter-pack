import Filter from './components/filter/filter';
import Sort from './components/sort/sort';
import { Guitar } from '../../../../types/guitar';
import ProductList from './components/product-list/product-list';
import { ITEMS_PER_PAGE } from '../../../../const';
import Pagination from './components/pagination/pagination';
import { useSelector } from 'react-redux';
import { getTotal } from '../../../../store/guitar-data/selectors';

type CatalogProps = {
  guitars: Guitar[],
  isServerError: boolean,
}

function Catalog({guitars, isServerError}: CatalogProps): JSX.Element {
  const totalGuitarNumber = useSelector(getTotal);

  const totalPageNumber = Math.ceil(totalGuitarNumber / ITEMS_PER_PAGE);

  return (
    <div className="catalog">
      <Filter />
      <Sort />
      {isServerError ?
        <div>
          <p>Сервер на данный момент не доступен. Попробуйте зайти позже.</p>
        </div> :
        <ProductList
          guitars={guitars}
          guitarCount={ITEMS_PER_PAGE}
        />}
      {totalPageNumber <= 1 ? '' : <Pagination totalPageNumber={totalPageNumber}/>}
    </div>
  );
}

export default Catalog;
