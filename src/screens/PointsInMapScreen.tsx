import {StackScreenProps} from '@react-navigation/stack';
import {collection, getDocs, query, where} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Map from '../components/Map';
import {db} from '../firebase';
import {Points} from '../interfaces/AppInterfaces';
import {RootStackParams} from '../navigator/StackNavigator';
import {PalleteColors} from '../themes/PaletteColors';
import PointsEmptyScreen from './PointsEmptyScreen';

interface Props extends StackScreenProps<RootStackParams, 'PointsInMap'> {}

const PointsInMapScreen = ({route}: Props) => {
  const [points, setPoints] = useState<Points[] | any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEmpty, setShowEmpty] = useState(false);
  const nameLocation = route.params.nameLocation;

  useEffect(() => {
    searchPoints();
  }, []);

  const searchPoints = async () => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, 'Puntos'),
        where('localidad', '==', nameLocation),
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setPoints([...points, doc.data()]);
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading === false && points.length === 0) {
    return <PointsEmptyScreen />;
  }

  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size={50} color={PalleteColors.primaryDark} />
      </View>
    );
  }

  return (
    <View style={styles.containerPrincipal}>
      <Text style={styles.textLocation}>Localidad de {nameLocation}</Text>
      <Map
        markets={points}
        location={{
          latitude: 4.712605519146334,
          longitude: -74.08856037503709,
        }}
        changeLocation={() => {}}
        showFab={false}
      />
    </View>
  );
};

export default PointsInMapScreen;

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
  },
  textLocation: {
    top: 0,
    backgroundColor: PalleteColors.primaryLight,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginRight: 5,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PalleteColors.primaryLight,
  },
});
