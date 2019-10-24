import React from 'react';
import { useSelector } from 'react-redux';

// import Orientation from 'react-native-orientation-locker';

import createRouter from './routes';
// import NavigationService from '~/services/navigation';

// console.disableYellowBox = true;

// Orientation.lockToPortrait();

export default function App() {
  const signed = useSelector(state => state.auth.signed);

  const Routes = createRouter(signed);

  return <Routes />;
}

//   const registerService = navigatorRef => {
//     NavigationService.setTopLevelNavigator(navigatorRef);
//   };

//   return <Routes ref={registerService} />;
