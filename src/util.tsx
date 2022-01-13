import { AppRoute } from './const';

export const resetLocationToFirstPage = (locationPath: string): string => {
  if (locationPath.includes(AppRoute.Page)) {
    const pathnameElements = locationPath.split('/');
    const page = pathnameElements[pathnameElements.length - 1];
    return locationPath.replace(page, 'page_1');
  }
  return locationPath;
};

export const getCurrentPage = (locationPath: string): number => {
  if (locationPath.includes(AppRoute.Page)) {
    const page = locationPath
      .split('/')[locationPath.split('/').length-1];

    return Number(page[page.length-1]
      .split('_')[page[page.length-1].split('_').length-1]);
  } else {
    return 1;
  }
};
