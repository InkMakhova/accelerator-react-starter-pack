import {useQuery} from '../../../../../../hooks/use-query';
import {useHistory, useLocation} from 'react-router-dom';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {getPriceMax, getPriceMin} from '../../../../../../store/guitar-data/selectors';
import {StringCount, Type} from '../../../../../../const';

function Filter(): JSX.Element {
  const query = useQuery();

  const location = useLocation();

  const history = useHistory();

  const theCheapestPrice = useSelector(getPriceMin);
  const theMostExpensivePrice = useSelector(getPriceMax);

  const [priceMin, setPriceMin] = useState(query.get('price_gte'));
  const [priceMax, setPriceMax] = useState(query.get('price_lte'));

  const [type, setType] = useState(query.getAll('type[]'));
  const [stringsCount, setStringsCount] = useState(query.getAll('stringsCount[]'));

  const handleChangeType = (guitarType: string) => {
    if (!type.includes(guitarType)) {
      query.append('type[]', guitarType);
      location.search = query.toString();
      history.push(`/?${location.search}`);
    } else {
      const newTypeList = query.getAll('type[]').filter((element) => element !== guitarType);
      query.delete('type[]');
      newTypeList.forEach((typeItem) => query.append('type[]', typeItem));
      location.search = query.toString();
      history.push(`/?${location.search}`);
    }
    setType(query.getAll('type[]'));
  };

  const handleChangeStringsCount = (stringsNumber: string) => {
    if (!stringsCount.includes(stringsNumber)) {
      query.append('stringCount[]', stringsNumber);
      location.search = query.toString();
      history.push(`/?${location.search}`);
    } else {
      const newStringsCountList = query.getAll('stringCount[]').filter((element) => element !== stringsNumber);
      query.delete('stringCount[]');
      newStringsCountList.forEach((item) => query.append('stringCount[]', item));
      location.search = query.toString();
      history.push(`/?${location.search}`);
    }
    setStringsCount(query.getAll('stringCount[]'));
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
            onChange={() => handleChangeType(Type.Acoustic)}
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
            onChange={() => handleChangeType(Type.Electric)}
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
            onChange={() => handleChangeType(Type.Ukulele)}
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
            onChange={() => handleChangeStringsCount(String(StringCount.Four))}
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
            onChange={() => handleChangeStringsCount(String(StringCount.Six))}
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
            onChange={() => handleChangeStringsCount(String(StringCount.Seven))}
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
            onChange={() => handleChangeStringsCount(String(StringCount.Twelve))}
            disabled={(type.includes(Type.Ukulele) || type.includes(Type.Electric)) && !type.includes(Type.Acoustic)}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
