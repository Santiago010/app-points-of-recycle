import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Map from '../components/Map';
import {useLocation} from '../hooks/useLocation';
import {PalleteColors} from '../themes/PaletteColors';

const MapUserLocationScreen = () => {
  const {hasLocation, initialPosition} = useLocation();

  if (!hasLocation) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size={50} color={PalleteColors.primaryDark} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Map
        markets={[]}
        location={{
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitude,
        }}
      />
    </View>
  );
};

export default MapUserLocationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PalleteColors.primaryLight,
  },
});
