import { AppRoute } from './const';

export const removePageFromLocation = (locationPath: string): string => {
  if (locationPath.includes(AppRoute.Page)) {
    const splitPathname = locationPath.split('/');
    const page = splitPathname[splitPathname.length - 1];
    return locationPath.replace(page, '');
  }
  return locationPath;
};

export const getCurrentPage = (locationPath: string): number => {
  if (locationPath.includes(AppRoute.Page)) {
    const splitPath = locationPath
      .split('/')[locationPath.split('/').length-1];

    return Number(splitPath[splitPath.length-1]
      .split('_')[splitPath[splitPath.length-1].split('_').length-1]);
  } else {
    return 1;
  }
};
