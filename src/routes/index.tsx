import React from 'react';

import SubStackNavigator from 'app/src/routes/Stack/Sub';
import MainTabNavigator from 'app/src/routes/Tab/Main';

interface Props {
  currentPage: string;
}

export default function (props: Props) {
  // console.log(props.currentPage);
  return <MainTabNavigator />;

  // if (props.currentPage === 'Main') {
  //   return <MainTabNavigator />;
  //   console.log('main!!');
  // }

  // console.log('sub!!');
  // return <SubStackNavigator />;
}
