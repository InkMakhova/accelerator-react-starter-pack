import {useQuery} from '../../../../../../hooks/use-query';
import {useHistory, useLocation} from 'react-router-dom';
import {useState} from 'react';

function Filter(): JSX.Element {
  const query = useQuery();

  const location = useLocation();

  const history = useHistory();

  const [priceMin, setPriceMin] = useState(query.get('price_gte'));
  const [priceMax, setPriceMax] = useState(query.get('price_lte'));

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
              placeholder="1 000"
              id="priceMin"
              name="от"
              onChange={(evt) => {
                const newPriceMin = evt.target.value;
                query.set('price_gte', newPriceMin ? newPriceMin : '');
                location.search = query.toString();
                history.push(`/?${location.search}`);
                setPriceMin(newPriceMin);
              }}
              value={priceMin ? priceMin : ''}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder="30 000"
              id="priceMax"
              name="до"
              onChange={(evt) => {
                const newPriceMax = evt.target.value;
                query.set('price_lte', newPriceMax ? newPriceMax : '');
                location.search = query.toString();
                history.push(`/?${location.search}`);
                setPriceMax(newPriceMax);
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
