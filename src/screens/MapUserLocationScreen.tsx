import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Map from '../components/Map';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyDUkySexfIbyW1-yN1suh-BcHcrGqPqj5A');

const MapUserLocationScreen = () => {
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      console.log(info);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Map markets={[]} />
    </View>
  );
};

export default MapUserLocationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
