import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import {PermissionsContext} from '../context/PermissionsContext';
import LoadingScreen from '../screens/LoadingScreen';
import PointsInMapScreen from '../screens/PointsInMapScreen';
import {Points} from '../interfaces/AppInterfaces';
import DetailsPointsScreen from '../screens/DetailsPointsScreen';
import AnteRoom from '../screens/AnteRoomScreen';
import SuggestionPointScreen from '../screens/SuggestionPointScreen';
import MapUserLocationScreen from '../screens/MapUserLocationScreen';

export type RootStackParams = {
  Map: undefined;
  Permissions: undefined;
  PointsInMap: {
    nameLocation: string;
  };
  DetailsPoint: Points;
  AnteRoom: undefined;
  SuggestionPoint: {
    addressNewPoint: string;
  };
  MapUserLocation: undefined;
  SeeRoute: undefined;
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
          <Stack.Screen name="AnteRoom" component={AnteRoom} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen
            name="SuggestionPoint"
            component={SuggestionPointScreen}
          />
          <Stack.Screen name="PointsInMap" component={PointsInMapScreen} />
          <Stack.Screen name="DetailsPoint" component={DetailsPointsScreen} />
          <Stack.Screen
            name="MapUserLocation"
            component={MapUserLocationScreen}
          />
        </>
      ) : (
        <Stack.Screen name="Permissions" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
