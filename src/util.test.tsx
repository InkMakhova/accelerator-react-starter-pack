import { getCurrentPage, resetLocationToFirstPage } from './util';

describe('Function: resetLocationToFirstPage', () => {
  test('reset location from 3 page to 1', () => {
    expect(resetLocationToFirstPage('/catalog/page_3')).toBe('/catalog/page_1');
  });

  test('reset location from 1 page to 1', () => {
    expect(resetLocationToFirstPage('/catalog/page_1')).toBe('/catalog/page_1');
  });

  test('reset location from page_ page to 1', () => {
    expect(resetLocationToFirstPage('/catalog/page_')).toBe('/catalog/page_1');
  });

  test('reset location should not do anything without page', () => {
    expect(resetLocationToFirstPage('/')).toBe('/');
  });

  test('reset location catalog should not do anything without page', () => {
    expect(resetLocationToFirstPage('/catalog')).toBe('/catalog');
  });
});

describe('Function: getCurrentPage', () => {
  test('get current page 3 from location page_3', () => {
    expect(getCurrentPage('/catalog/page_3')).toBe(3);
  });

  test('get current page 33 from location page_33', () => {
    expect(getCurrentPage('/catalog/page_33')).toBe(33);
  });

  test('get current page from location empty page', () => {
    expect(getCurrentPage('/catalog/page_')).toBe(1);
  });

  test('get current page from location page is NaN', () => {
    expect(getCurrentPage('/catalog/page_one')).toBe(1);
  });
});
