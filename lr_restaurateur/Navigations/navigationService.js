// RootNavigation.js

import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()
console.log(navigationRef,'navigationRef')


export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
console.log(navigate,'navigate')
// add other navigation functions that you need and export them