import React from 'react';

import GlobalStyles from './styles/GlobalStyles';

import RouteScreen from './RouteScreen';
import RecordScreen from './screens/record/RecordScreen';
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
