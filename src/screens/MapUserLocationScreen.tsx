import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Map from '../components/Map';
import {useLocation} from '../hooks/useLocation';
import LoadingScreen from './LoadingScreen';
import {Location, Points} from '../interfaces/AppInterfaces';
import {GetAddress} from '../helpers/GetAddress';
import {useNavigation} from '@react-navigation/native';
import ModalQuestionAddress from '../components/ModalQuestionAddress';
import ModalErrorConnection from '../components/ModalErrorConnection';

const MapUserLocationScreen = () => {
  const {hasLocation, initialPosition} = useLocation();
  const navigation = useNavigation();
  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [points, setPoints] = useState<Points[] | any[]>([]);

  const changeLocation = async (coords: Location) => {
    setPoints([
      {
        direccion: '',
        email: '',
        latitud: coords.latitude,
        longitud: coords.longitude,
        localidad: '',
        Nombre: '',
        telefono: '',
        web: '',
      },
    ]);
    try {
      const myAddress = await GetAddress(coords);
      setAddress(myAddress.results[0].formatted_address);
      setModalVisible(true);
    } catch (error) {
      // console.error(error);
      setModalError(true);
    }
  };

  const useLocationCurrent = async () => {
    try {
      const myAddress = await GetAddress(initialPosition);
      setAddress(myAddress.results[0].formatted_address);
      setModalVisible(true);
    } catch (error) {
      setModalError(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setModalError(false);
    }, 5000);
  }, [modalError]);

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ModalErrorConnection modalVisible={modalError} />
      <ModalQuestionAddress
        modalVisible={modalVisible}
        address={address}
        navigateSuggestionPoint={() =>
          navigation.navigate('SuggestionPoint', {
            addressNewPoint: address,
          })
        }
        setModalVisible={() => setModalVisible(!modalVisible)}
      />

      <Map
        markets={points}
        location={initialPosition}
        changeLocation={changeLocation}
        showFab={true}
        useLocationCurrent={useLocationCurrent}
      />
    </View>
  );
};

export default MapUserLocationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
