import { useQuery } from '../../../../../../hooks/use-query';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPriceMax, getPriceMin } from '../../../../../../store/guitar-data/selectors';
import { QueryParam, StringCount, Type } from '../../../../../../const';
import { resetLocationToFirstPage } from '../../../../../../util';

function Filter(): JSX.Element {
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  const theCheapestPrice = useSelector(getPriceMin);
  const theMostExpensivePrice = useSelector(getPriceMax);

  const [priceMin, setPriceMin] = useState(query.get(QueryParam.PriceMinParam));
  const [priceMax, setPriceMax] = useState(query.get(QueryParam.PriceMaxParam));

  const [type, setType] = useState(query.getAll(QueryParam.TypeParam));

  const [stringCount, setStringCount] = useState(query.getAll(QueryParam.StringCountParam));

  useEffect(() => {
    setPriceMin(query.get(QueryParam.PriceMinParam));
    setPriceMax(query.get(QueryParam.PriceMaxParam ));
    setType(query.getAll(QueryParam.TypeParam));
    setStringCount(query.getAll(QueryParam.StringCountParam));
    /*eslint-disable-next-line*/
  }, [location.search]);

  const changeURL = () => {
    location.pathname = resetLocationToFirstPage(location.pathname);
    location.search = query.toString();
    history.push(`${location.pathname}?${location.search}`);
  };

  const onChangeFilterHandler = (
    state: string[],
    filterType: string,
    queryParam: string) => {
    if (!state.includes(filterType)) {
      query.append(queryParam, filterType);
    } else {
      const newFilterList = query.getAll(queryParam)
        .filter((element) => element !== filterType);
      query.delete(queryParam);
      newFilterList.forEach((filter) => query.append(queryParam, (filter)));
    }
    changeURL();
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
              onChange={(evt) => setPriceMin(evt.target.value)}
              onBlur={(evt) => {
                const newPriceMin = evt.target.value;
                if (Number(newPriceMin) < theCheapestPrice && newPriceMin !== '') {
                  query.set(QueryParam.PriceMinParam, String(theCheapestPrice));
                } else if (Number(newPriceMin) > theMostExpensivePrice) {
                  query.set(QueryParam.PriceMinParam, String(theMostExpensivePrice));
                } else if (Number(priceMax) && Number(newPriceMin) > Number(priceMax)) {
                  query.set(QueryParam.PriceMinParam, String(priceMax));
                } else if (newPriceMin === '') {
                  query.delete(QueryParam.PriceMinParam);
                } else {
                  query.set(QueryParam.PriceMinParam, newPriceMin);
                }
                changeURL();
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
              onChange={(evt) => setPriceMax(evt.target.value)}
              onBlur={(evt) => {
                const newPriceMax = evt.target.value;
                if (Number(newPriceMax) > theMostExpensivePrice && newPriceMax !== '') {
                  query.set(QueryParam.PriceMaxParam, String(theMostExpensivePrice));
                } else if (Number(newPriceMax) < theCheapestPrice && newPriceMax !== '') {
                  query.set(QueryParam.PriceMaxParam, String(theCheapestPrice));
                } else if (Number(priceMin) && Number(newPriceMax) < Number(priceMin) && newPriceMax !== '') {
                  query.set(QueryParam.PriceMaxParam, String(priceMin));
                } else if (newPriceMax === '') {
                  query.delete(QueryParam.PriceMaxParam);
                } else {
                  query.set(QueryParam.PriceMaxParam, newPriceMax);
                }
                changeURL();
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
            checked={type.includes(Type.Acoustic)}
            onChange={() => onChangeFilterHandler(type, Type.Acoustic, QueryParam.TypeParam)}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            checked={type.includes(Type.Electric)}
            onChange={() => onChangeFilterHandler(type, Type.Electric, QueryParam.TypeParam)}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            checked={type.includes(Type.Ukulele)}
            onChange={() => onChangeFilterHandler(type, Type.Ukulele, QueryParam.TypeParam)}
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
            checked={stringCount.includes(String(StringCount.Four))}
            onChange={() =>
              onChangeFilterHandler(stringCount, String(StringCount.Four), QueryParam.StringCountParam)}
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
            checked={stringCount.includes(String(StringCount.Six))}
            onChange={() =>
              onChangeFilterHandler(stringCount, String(StringCount.Six), QueryParam.StringCountParam)}
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
            checked={stringCount.includes(String(StringCount.Seven))}
            onChange={() =>
              onChangeFilterHandler(stringCount, String(StringCount.Seven), QueryParam.StringCountParam)}
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
            checked={stringCount.includes(String(StringCount.Twelve))}
            onChange={() =>
              onChangeFilterHandler(stringCount, String(StringCount.Twelve), QueryParam.StringCountParam)}
            disabled={(type.includes(Type.Ukulele) || type.includes(Type.Electric)) && !type.includes(Type.Acoustic)}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
