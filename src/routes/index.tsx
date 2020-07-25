import React from 'react';

import SubStackNavigator from 'app/src/routes/Stack/Sub';
import MainTabNavigator from 'app/src/routes/Tab/Main';

interface Props {
  currentPage: string;
}

export default function (props: Props) {
  // console.log(props.currentPage);

  if (props.currentPage === 'Main') {
    console.log('main!!');
    return <MainTabNavigator />;
  }

  console.log('sub!!');
  return <SubStackNavigator />;
}
