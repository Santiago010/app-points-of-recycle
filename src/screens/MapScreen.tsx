import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {collection, getDocs, query, where} from 'firebase/firestore';
// import {db} from '../firebase';

import ListLocalities from '../components/ListLocalities';
import {PalleteColors} from '../themes/PaletteColors';

const MapScreen = () => {
  // useEffect(() => {
  //   cons();
  // }, []);

  // const cons = async () => {
  //   console.log('hola');
  //   const querySnapshot = await getDocs(collection(db, 'Puntos'));
  //   querySnapshot.forEach(doc => {
  //     console.log(doc.data());
  //   });
  // };

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
    padding: 2,
  },
});
