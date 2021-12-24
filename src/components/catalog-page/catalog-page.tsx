import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import BreadCrumbs from '../common/bread-crumbs/bread-crumbs';
import Catalog from './components/catalog/catalog';
import {getGuitars} from '../../store/guitar-data/selectors';
import {useSelector} from 'react-redux';
import {Page} from '../../const';

document.title = Page.Catalog;

function CatalogPage(): JSX.Element {
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
