import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import BreadCrumbs from '../common/bread-crumbs/bread-crumbs';
import Catalog from './components/catalog/catalog';
import {getGuitars} from '../../store/guitar-data/selectors';
import {useSelector} from 'react-redux';
import {ITEMS_PER_PAGE, Order, PageTitle, PRICE_MAX, PRICE_MIN, Sort as SortType} from '../../const';
import {fetchGuitarByAsc, fetchGuitarByDesc, fetchGuitarsAction} from '../../store/api-actions';
import {store} from '../../index';
import {useEffect, useRef} from 'react';
import {useQuery} from '../../hooks/use-query';
import {useLocation} from 'react-router-dom';

document.title = PageTitle.Catalog;

function CatalogPage(): JSX.Element {

  const query = useQuery();
  const location = useLocation();

  let page = 1;

  if (location.pathname.includes('page_')) {
    const splitPath = location.pathname
      .split('/')[location.pathname
        .split('/').length-1];

    page = Number(splitPath[splitPath.length-1]
      .split('_')[splitPath[splitPath.length-1]
        .split('_').length-1]);
  } else {
    page = 1;
  }

  const priceMin = query.get('price_gte') ? query.get('price_gte') : String(PRICE_MIN);
  const priceMax = query.get('price_lte') ? query.get('price_lte') : String(PRICE_MAX);
  const start = String((page-1) * ITEMS_PER_PAGE);
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
