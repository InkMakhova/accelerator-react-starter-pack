import { useEffect, useState } from 'react';
import { searchGuitarsAction } from '../../../../../store/api-actions';
import { Guitar } from '../../../../../types/guitar';
import { useSelector } from 'react-redux';
import { getSearchSuggestions } from '../../../../../store/guitar-data/selectors';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../../../../const';
import { store } from '../../../../../store/store';

function Search(): JSX.Element {
  const history = useHistory();

  const [searchValue, setSearchValue] = useState('');

  const showSearchSuggestions = (searchSuggestions: Guitar[]): JSX.Element => {
    if (searchSuggestions.length > 0) {
      const suggestionsFromFirstLetter = searchSuggestions.filter((suggest) =>
        suggest.name.toLowerCase().slice(0, searchValue.length) === searchValue.toLowerCase());

      if (suggestionsFromFirstLetter.length > 0) {
        return (
          <ul
            className="form-search__select-list"
            style={{zIndex: '1'}}
            data-testid="search-suggestion-list"
          >
            {suggestionsFromFirstLetter.map((suggestion) => (
              <li
                className="form-search__select-item"
                tabIndex={0}
                key={suggestion.id}
                onClick ={() => {
                  history.push(`${AppRoute.Guitars}${suggestion.id}`);
                  setSearchValue('');
                }}
                data-testid="search-suggestion-item"
              >
                {suggestion.name}
              </li>),
            )}
          </ul>
        );
      }
      return (
        <ul
          className="form-search__select-list hidden"
          data-testid="search-suggestion-list"
        >
        </ul>
      );
    }
    return (
      <ul
        className="form-search__select-list hidden"
        data-testid="search-suggestion-list"
      >
      </ul>
    );
  };

  useEffect(() => {
    if (searchValue !== '') {
      store.dispatch(searchGuitarsAction(searchValue));
    }
  }, [searchValue]);

  const searchSuggestions = useSelector(getSearchSuggestions);

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          value={searchValue}
          onChange={(evt) => setSearchValue(evt.target.value)}
          data-testid="search"
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>

      {searchValue === '' ? '' : showSearchSuggestions(searchSuggestions)}
    </div>
  );
}

export default Search;
