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
    const locationParts = locationPath.split('/');
    const pagePart = locationParts[locationParts.length - 1];
    const pageParts = pagePart.split('_');
    const page = Number(pageParts[pageParts.length-1]);

    return (isNaN(page) || page < 1) ? 1 : page;
  } else {
    return 1;
  }
};
