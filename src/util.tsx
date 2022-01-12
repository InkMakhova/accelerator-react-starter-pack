import {AppRoute} from './const';

export const removePageFromLocation = (locationPath: string): string => {
  if (locationPath.includes(AppRoute.Page)) {
    const splitPathname = locationPath.split('/');
    const page = splitPathname[splitPathname.length - 1];
    return locationPath.replace(page, '');
  }
  return locationPath;
};
