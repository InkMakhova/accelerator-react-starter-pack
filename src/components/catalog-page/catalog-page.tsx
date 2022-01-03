import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import BreadCrumbs from '../common/bread-crumbs/bread-crumbs';
import Catalog from './components/catalog/catalog';
import {getGuitars, getStart} from '../../store/guitar-data/selectors';
import {useSelector} from 'react-redux';
import {Order, Page, PRICE_MAX, PRICE_MIN, Sort as SortType} from '../../const';
import {fetchGuitarsAction} from '../../store/api-actions';
import {store} from '../../index';
import {useEffect} from 'react';
import {useQuery} from '../../hooks/use-query';

document.title = Page.Catalog;

function CatalogPage(): JSX.Element {

  const query = useQuery();

  const priceMin = query.get('price_gte') ? query.get('price_gte') : String(PRICE_MIN);
  const priceMax = query.get('price_lte') ? query.get('price_lte') : String(PRICE_MAX);
  const start = useSelector(getStart);
  const sort = query.get('_sort') && query.get('_sort') as SortType ? query.get('_sort') : SortType.Price;
  const order = query.get('_order') && query.get('_order') as Order ? query.get('_order') : Order.Asc;

  useEffect(() => {
    store.dispatch(fetchGuitarsAction({priceMin, priceMax, start, sort, order}));
  }, [priceMin, priceMax, start, sort, order]);

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
