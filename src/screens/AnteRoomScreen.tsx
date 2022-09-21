import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {PalleteColors} from '../themes/PaletteColors';

const AnteRoomScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...styles.btns,
          backgroundColor: PalleteColors.primaryDark,
          borderBottomEndRadius: 50,
          borderBottomStartRadius: 50,
          marginBottom: 10,
        }}
        onPress={() =>
          navigation.navigate('SuggestionPoint', {
            addressNewPoint: '',
          })
        }>
        <Text style={styles.text}>Sugerir punto de recolección</Text>
        <Image
          style={styles.images}
          source={require('../assets/suggestion.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...styles.btns,
          backgroundColor: PalleteColors.secundaryLight,
          borderTopEndRadius: 50,
          borderTopStartRadius: 50,
          marginTop: 10,
        }}
        onPress={() => navigation.navigate('Map')}>
        <Text style={styles.text}>Ver puntos de recolección por localidad</Text>
        <Image style={styles.images} source={require('../assets/Points.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default AnteRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: PalleteColors.primaryLight,
  },
  btns: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: PalleteColors.secundaryDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  images: {
    width: 250,
    height: 250,
    resizeMode: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
