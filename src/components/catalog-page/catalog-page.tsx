import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import BreadCrumbs from '../common/bread-crumbs/bread-crumbs';
import Catalog from './components/catalog/catalog';
import { getGuitars } from '../../store/guitar-data/selectors';
import { useSelector } from 'react-redux';
import {
  AppRoute,
  ITEMS_PER_PAGE, NavigationSection,
  Order,
  PageTitle,
  PRICE_MAX,
  PRICE_MIN,
  QueryParam,
  Sort as SortType
} from '../../const';
import {
  fetchGuitarByAsc,
  fetchGuitarByDesc,
  fetchGuitarsAction } from '../../store/api-actions';
import {useEffect, useRef, useState} from 'react';
import { useQuery } from '../../hooks/use-query';
import { useHistory, useLocation } from 'react-router-dom';
import { getCurrentPage } from '../../util';
import { store } from '../../store/store';

document.title = PageTitle.Catalog;

function CatalogPage(): JSX.Element {
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  const [isServerError, setIsServerError] = useState(false);

  const handleError = () => setIsServerError(true);

  if (!location.pathname.includes(AppRoute.Catalog)) {
    location.pathname = `${AppRoute.Catalog}${AppRoute.Page}1`;
    location.search = query.toString();
    history.push(`${location.pathname}?${location.search}`);
  } else {
    if (!location.pathname.includes(AppRoute.Page)) {
      location.pathname = `${AppRoute.Catalog}${AppRoute.Page}1`;
      location.search = query.toString();
      history.push(`${location.pathname}?${location.search}`);
    }
  }

  const currentPage = getCurrentPage(location.pathname);

  const priceMin = query.get(QueryParam.PriceMinParam) ?
    query.get(QueryParam.PriceMinParam) :
    String(PRICE_MIN);

  const priceMax = query.get(QueryParam.PriceMaxParam) ?
    query.get(QueryParam.PriceMaxParam) :
    String(PRICE_MAX);

  const start = String((currentPage-1) * ITEMS_PER_PAGE);

  const sort = query.get(QueryParam.SortParam) && query.get(QueryParam.SortParam) as SortType ?
    query.get(QueryParam.SortParam) :
    SortType.Price;

  const order = query.get(QueryParam.OrderParam) && query.get(QueryParam.OrderParam) as Order ?
    query.get(QueryParam.OrderParam) :
    Order.Asc;

  const types = query.getAll(QueryParam.TypeParam).length !== 0 ?
    query.getAll(QueryParam.TypeParam) :
    [];

  const stringCount = query.getAll(QueryParam.StringCountParam).length !== 0 ?
    query.getAll(QueryParam.StringCountParam) :
    [];

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
    store.dispatch(fetchGuitarsAction(
      {priceMin,
        priceMax,
        types: typesRef.current,
        stringCount: stringsCountRef.current,
        sort,
        order,
        start,
        limit}, handleError));
    /*eslint-disable-next-line*/
  }, [priceMin, priceMax, typesRef.current, stringsCountRef.current, sort, order, start, limit]);

  const guitars = useSelector(getGuitars);

  return (
    <div className="wrapper">
      <Header currentNavigationSection={NavigationSection.Catalog}/>

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <BreadCrumbs />
          <Catalog guitars={guitars} isServerError={isServerError}/>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CatalogPage;
