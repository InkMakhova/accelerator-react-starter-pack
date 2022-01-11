import Filter from './components/filter/filter';
import Sort from './components/sort/sort';
import {Guitar} from '../../../../types/guitar';
import ProductList from './components/product-list/product-list';
import {ITEMS_PER_PAGE} from '../../../../const';
import Pagination from './components/pagination/pagination';

type CatalogProps = {
  guitars: Guitar[],
}

function Catalog({guitars}: CatalogProps): JSX.Element {
  return (
    <div className="catalog">
      <Filter />
      <Sort />
      <ProductList guitars={guitars} guitarCount={ITEMS_PER_PAGE} />
      <Pagination />
    </div>
  );
}

export default Catalog;
