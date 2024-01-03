import React from 'react';

import GlobalStyles from './styles/GlobalStyles';

import RouteScreen from './RouteScreen';
import RecordInfoScreen from './screens/record/RecordInfoScreen';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <RouteScreen />
      {/* <RecordInfoScreen /> */}
    </>
  );
};

export default App;
