import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {PalleteColors} from '../themes/PaletteColors';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color={PalleteColors.primaryDark} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default LoadingScreen;
