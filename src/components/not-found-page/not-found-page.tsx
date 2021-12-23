import Header from '../common/header/header';
import {Link} from 'react-router-dom';
import Footer from '../common/footer/footer';
import {AppRoute} from '../../const';

function NotFoundPage(): JSX.Element {

  return (
    <div className="wrapper">
      <Header/>

      <main className="page-content">
        <div className="container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h1
            className="page-content__title title title--bigger"
            style={{fontSize: 'xxx-large', marginBottom: '1em'}}
          >404
          </h1>
          <p style={{fontWeight: 'bold', marginBottom: '1em'}}>
            Страница не найдена
          </p>
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

export default NotFoundPage;
