import Filter from './components/filter/filter';
import Sort from './components/sort/sort';
import ProductList from './components/product-list/product-list';
import Pagination from './components/pagination/pagination';
import {PRODUCT_NUMBER_ON_PAGE} from '../../../../const';

function Catalog(): JSX.Element {
  return (
    <div className="catalog">
      <Filter />
      <Sort />
      <ProductList guitars={} guitarCount={PRODUCT_NUMBER_ON_PAGE} />
      <Pagination pageNumber={} currentPage={} />
    </div>
  );
}

export default Catalog;
