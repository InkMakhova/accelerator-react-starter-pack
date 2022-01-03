import {useQuery} from '../../../../../../hooks/use-query';
import {useHistory, useLocation} from 'react-router-dom';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {getPriceMax, getPriceMin} from '../../../../../../store/guitar-data/selectors';
// import {URLSearchParams} from 'url';

// type queryParams = {
//   minPrice: number,
//   maxPrice: number,
//   types: [],
//   strings: [],
// }

function Filter(): JSX.Element {
  const query = useQuery();

  const location = useLocation();

  const history = useHistory();

  const theCheapestPrice = useSelector(getPriceMin);
  const theMostExpensivePrice = useSelector(getPriceMax);

  const [priceMin, setPriceMin] = useState(query.get('price_gte'));
  const [priceMax, setPriceMax] = useState(query.get('price_lte'));

  /*eslint-disable-next-line no-console*/
  console.log(query.getAll('type[]'));
  //const [type, setType] = useState(query.get('type'));

  // const getQuery = (params: queryParams): string => {
  //   const {minPrice, maxPrice, types, strings} = params;
  //
  //   const queryParams = new URLSearchParams({
  //     'price_gte': String(minPrice),
  //     'price_lte': String(maxPrice),
  //     'type': types,
  //     'stringCount': strings,
  //   });
  //
  //   return queryParams.toString();
  // };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder={String(theCheapestPrice)}
              id="priceMin"
              name="от"
              onChange={(evt) => {
                setPriceMin(evt.target.value);
              }}
              onBlur={(evt) => {
                if (Number(evt.target.value) < 0 || Number(evt.target.value) < theCheapestPrice) {
                  setPriceMin(String(theCheapestPrice));
                  query.set('price_gte', String(theCheapestPrice));
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                } else if (Number(evt.target.value) > Number(priceMax)) {
                  setPriceMin(String(priceMax));
                  query.set('price_gte', String(priceMax));
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                } else {
                  setPriceMin(evt.target.value);
                  query.set('price_gte', evt.target.value);
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                }
              }}
              value={priceMin ? priceMin : ''}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={String(theMostExpensivePrice)}
              id="priceMax"
              name="до"
              onChange={(evt) => {
                const newPriceMax = evt.target.value;
                query.set('price_lte', newPriceMax ? newPriceMax : '');
                location.search = query.toString();
                history.push(`/?${location.search}`);
                setPriceMax(newPriceMax);
              }}
              onBlur={(evt) => {
                if (Number(evt.target.value) < 0 || Number(evt.target.value) > theMostExpensivePrice) {
                  setPriceMax(String(theMostExpensivePrice));
                  query.set('price_lte', String(theMostExpensivePrice));
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                } else if (Number(evt.target.value) < Number(priceMin)) {
                  setPriceMax(String(priceMin));
                  query.set('price_lte', String(priceMin));
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                } else {
                  setPriceMax(evt.target.value);
                  query.set('price_lte', evt.target.value);
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                }
              }}
              value={priceMax ? priceMax : ''}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"/>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric"/>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele"/>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings"/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings"/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
