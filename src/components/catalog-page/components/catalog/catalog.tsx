import Filter from './components/filter/filter';
import Sort from './components/sort/sort';
import {Guitar} from '../../../../types/guitar';
import ProductList from './components/product-list/product-list';
import {PRODUCT_NUMBER_ON_PAGE} from '../../../../const';

type CatalogProps = {
  guitars: Guitar[],
}

function Catalog({guitars}: CatalogProps): JSX.Element {
  return (
    <div className="catalog">
      <Filter />
      <Sort />
      <ProductList guitars={guitars} guitarCount={PRODUCT_NUMBER_ON_PAGE} />
      {/*<Pagination pageNumber={} currentPage={} />*/}
    </div>
  );
}

export default Catalog;
