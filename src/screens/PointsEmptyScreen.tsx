import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {PalleteColors} from '../themes/PaletteColors';

const PointsEmptyScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/empty.png')} style={styles.itemImg} />
      <Text style={styles.text}>
        ¡Lo sentimos mucho! no encontramos puntos de recolección en esta
        localidad o no tienes acceso a internet
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PalleteColors.primaryLight,
    justifyContent: 'center',
  },
  text: {
    color: PalleteColors.primaryDark,
    fontSize: 20,
    textAlign: 'center',
  },
  itemImg: {width: 350, height: 400, resizeMode: 'center'},
});

export default PointsEmptyScreen;
