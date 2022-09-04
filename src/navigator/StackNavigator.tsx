import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import {PermissionsContext} from '../context/PermissionsContext';
import LoadingScreen from '../screens/LoadingScreen';
import PointsInMapScreen from '../screens/PointsInMapScreen';
import {Points} from '../interfaces/AppInterfaces';
import DetailsPointsScreen from '../screens/DetailsPointsScreen';

export type RootStackParams = {
  Map: undefined;
  Permissions: undefined;
  PointsInMap: {
    nameLocation: string;
  };
  DetailsPoint: Points;
};

const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = () => {
  const {permissions} = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }
  return (
    <Stack.Navigator
      initialRouteName="Permissions"
      screenOptions={{headerShown: false}}>
      {permissions.locationStatus === 'granted' ? (
        <>
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="PointsInMap" component={PointsInMapScreen} />
          <Stack.Screen name="DetailsPoint" component={DetailsPointsScreen} />
        </>
      ) : (
        <Stack.Screen name="Permissions" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
