import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import BreadCrumbs from '../common/bread-crumbs/bread-crumbs';
import Catalog from './components/catalog/catalog';
import {getGuitars, getStart} from '../../store/guitar-data/selectors';
import {useSelector} from 'react-redux';
import {ITEMS_PER_PAGE, Order, PageTitle, PRICE_MAX, PRICE_MIN, Sort as SortType} from '../../const';
import {fetchGuitarByAsc, fetchGuitarByDesc, fetchGuitarsAction} from '../../store/api-actions';
import {store} from '../../index';
import {useEffect, useRef} from 'react';
import {useQuery} from '../../hooks/use-query';

document.title = PageTitle.Catalog;

function CatalogPage(): JSX.Element {

  const query = useQuery();

  const priceMin = query.get('price_gte') ? query.get('price_gte') : String(PRICE_MIN);
  const priceMax = query.get('price_lte') ? query.get('price_lte') : String(PRICE_MAX);
  const start = String(useSelector(getStart));
  const sort = query.get('_sort') && query.get('_sort') as SortType ? query.get('_sort') : SortType.Price;
  const order = query.get('_order') && query.get('_order') as Order ? query.get('_order') : Order.Asc;
  const types = query.getAll('type[]').length !== 0 ? query.getAll('type[]') : [];
  const stringCount = query.getAll('stringCount[]').length !== 0 ? query.getAll('stringCount[]') : [];
  const limit = String(ITEMS_PER_PAGE);

  const arraysNotEqual = (prev: string[], next: string[]) => {
    if (prev.length !== next.length) {
      return true;
    }

    for (const i in prev) {
      if (prev[i] !== next[i]) {
        return true;
      }
    }
    return false;
  };

  const typesRef = useRef(types);
  if (arraysNotEqual(typesRef.current, types)) {
    typesRef.current = types;
  }

  const stringsCountRef = useRef(stringCount);
  if (arraysNotEqual(stringsCountRef.current, stringCount)) {
    stringsCountRef.current = stringCount;
  }

  useEffect(() => {
    store.dispatch(fetchGuitarByAsc());
    store.dispatch(fetchGuitarByDesc());
    store.dispatch(fetchGuitarsAction({priceMin, priceMax, types: typesRef.current, sort, order, start, limit, stringCount: stringsCountRef.current}));
    /*eslint-disable-next-line*/
  }, [priceMin, priceMax, typesRef.current, stringsCountRef.current, sort, order, start, limit]);

  const guitars = useSelector(getGuitars);

  return (
    <div className="wrapper">
      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <BreadCrumbs />
          <Catalog guitars={guitars}/>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CatalogPage;
