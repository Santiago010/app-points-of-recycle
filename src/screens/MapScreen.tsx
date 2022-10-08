import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import ListLocalities from '../components/ListLocalities';
import {PalleteColors} from '../themes/PaletteColors';

const MapScreen = () => {
  return (
    <View style={styles.containerPrincipal}>
      <Text style={styles.title}>Escoge una localidad</Text>

      <ListLocalities />
    </View>
  );
};

export default MapScreen;
const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
  },
  title: {
    backgroundColor: PalleteColors.primaryLight,
    color: PalleteColors.primaryDark,
    fontWeight: 'bold',
    fontSize: 25,
    borderColor: PalleteColors.primaryDark,
    borderBottomWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
