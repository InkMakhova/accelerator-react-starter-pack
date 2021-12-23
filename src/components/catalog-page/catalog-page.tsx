import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import BreadCrumbs from '../common/bread-crumbs/bread-crumbs';
import Catalog from './components/catalog/catalog';

function CatalogPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <BreadCrumbs />
          <Catalog />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CatalogPage;
