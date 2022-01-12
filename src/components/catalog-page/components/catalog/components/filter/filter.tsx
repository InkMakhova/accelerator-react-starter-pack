import { useQuery } from '../../../../../../hooks/use-query';
import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getPriceMax, getPriceMin } from '../../../../../../store/guitar-data/selectors';
import { StringCount, Type } from '../../../../../../const';
import { removePageFromLocation } from '../../../../../../util';

function Filter(): JSX.Element {
  const query = useQuery();

  const location = useLocation();

  const history = useHistory();

  const theCheapestPrice = useSelector(getPriceMin);
  const theMostExpensivePrice = useSelector(getPriceMax);

  const [priceMin, setPriceMin] = useState(query.get('price_gte'));
  const [priceMax, setPriceMax] = useState(query.get('price_lte'));

  const [type, setType] = useState(query.getAll('type[]'));
  const [stringCount, setStringCount] = useState(query.getAll('stringCount[]'));

  const onChangeFilterHandler = (state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>, filterType: string, queryParam: string) => {
    if (!state.includes(filterType)) {
      query.append(queryParam, filterType);
      location.pathname = removePageFromLocation(location.pathname);
      location.search = query.toString();
      history.push(`${location.pathname}?${location.search}`);
    } else {
      const newFilterList = query.getAll(queryParam).filter((element) => element !== filterType);
      query.delete(queryParam);
      newFilterList.forEach((filter) => query.append(queryParam, (filter)));
      location.search = query.toString();
      history.push(`${location.pathname}?${location.search}`);
    }
    setState(query.getAll(queryParam));
  };

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
                const newPriceMin = evt.target.value;

                if (Number(newPriceMin) < theCheapestPrice && newPriceMin !== '') {
                  setPriceMin(String(theCheapestPrice));
                  query.set('price_gte', String(theCheapestPrice));
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                } else if (Number(newPriceMin) > theMostExpensivePrice) {
                  setPriceMin(String(theMostExpensivePrice));
                  query.set('price_gte', String(theMostExpensivePrice));
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                } else if (Number(priceMax) && Number(newPriceMin) > Number(priceMax)) {
                  setPriceMin(String(priceMax));
                  query.set('price_gte', String(priceMax));
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                } else if (newPriceMin === '') {
                  setPriceMin('');
                  query.delete('price_gte');
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                } else{
                  setPriceMin(newPriceMin);
                  query.set('price_gte', newPriceMin);
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
                setPriceMax(evt.target.value);
              }}
              onBlur={(evt) => {
                const newPriceMax = evt.target.value;

                if (Number(newPriceMax) > theMostExpensivePrice && newPriceMax !== '') {
                  setPriceMax(String(theMostExpensivePrice));
                  query.set('price_lte', String(theMostExpensivePrice));
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                } else if (Number(newPriceMax) < theCheapestPrice && newPriceMax !== '') {
                  setPriceMax(String(theCheapestPrice));
                  query.set('price_lte', String(theCheapestPrice));
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                } else if (Number(priceMin) && Number(newPriceMax) < Number(priceMin) && newPriceMax !== '') {
                  setPriceMax(String(priceMin));
                  query.set('price_lte', String(priceMin));
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                } else if (newPriceMax === '') {
                  setPriceMax('');
                  query.delete('price_lte');
                  location.search = query.toString();
                  history.push(`/?${location.search}`);
                } else {
                  setPriceMax(newPriceMax);
                  query.set('price_lte', newPriceMax);
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
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            defaultChecked={type.includes(Type.Acoustic)}
            onChange={() => onChangeFilterHandler(type, setType, Type.Acoustic, 'type[]')}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            defaultChecked={type.includes(Type.Electric)}
            onChange={() => onChangeFilterHandler(type, setType, Type.Electric, 'type[]')}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            defaultChecked={type.includes(Type.Ukulele)}
            onChange={() => onChangeFilterHandler(type, setType, Type.Ukulele, 'type[]')}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            defaultChecked={stringCount.includes(String(StringCount.Four))}
            onChange={() => onChangeFilterHandler(stringCount, setStringCount, String(StringCount.Four), 'stringCount[]')}
            disabled={!type.includes(Type.Ukulele) && !type.includes(Type.Electric) && type.includes(Type.Acoustic)}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            defaultChecked={stringCount.includes(String(StringCount.Six))}
            onChange={() => onChangeFilterHandler(stringCount, setStringCount, String(StringCount.Six), 'stringCount[]')}
            disabled={type.includes(Type.Ukulele) && !type.includes(Type.Electric) && !type.includes(Type.Acoustic)}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            defaultChecked={stringCount.includes(String(StringCount.Seven))}
            onChange={() => onChangeFilterHandler(stringCount, setStringCount, String(StringCount.Seven), 'stringCount[]')}
            disabled={type.includes(Type.Ukulele) && !type.includes(Type.Electric) && !type.includes(Type.Acoustic)}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            defaultChecked={stringCount.includes(String(StringCount.Twelve))}
            onChange={() => onChangeFilterHandler(stringCount, setStringCount, String(StringCount.Twelve), 'stringCount[]')}
            disabled={(type.includes(Type.Ukulele) || type.includes(Type.Electric)) && !type.includes(Type.Acoustic)}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
