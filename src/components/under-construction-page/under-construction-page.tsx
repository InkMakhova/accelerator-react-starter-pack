import Header from '../common/header/header';
import { Link } from 'react-router-dom';
import Footer from '../common/footer/footer';
import { AppRoute } from '../../const';

type UnderConstructionPageProps = {
  currentNavigationSection: string;
}

function UnderConstructionPage({currentNavigationSection}: UnderConstructionPageProps): JSX.Element {

  return (
    <div className="wrapper">
      <Header currentNavigationSection={currentNavigationSection}/>

      <main className="page-content">
        <div className="container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h1
            className="page-content__title title title--bigger"
            style={{fontSize: 'xxx-large', marginBottom: '1em'}}
          >Страница находится в разработке
          </h1>
          <Link
            to={AppRoute.Root}
            style={{fontWeight: 'bold', color: '#c90606', textDecoration: 'underline'}}
          >
            Вернуться в меню каталога
          </Link>
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default UnderConstructionPage;
