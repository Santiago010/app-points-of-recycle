import React, {useState} from 'react';
import {View, StyleSheet, Modal, Text, TouchableOpacity} from 'react-native';
import Map from '../components/Map';
import {useLocation} from '../hooks/useLocation';
import {PalleteColors} from '../themes/PaletteColors';
import LoadingScreen from './LoadingScreen';
import {Location, Points} from '../interfaces/AppInterfaces';
import {GetAddress} from '../helpers/GetAddress';
import {useNavigation} from '@react-navigation/native';

const MapUserLocationScreen = () => {
  const {hasLocation, initialPosition} = useLocation();
  const navigation = useNavigation();
  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
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
    const myAddress = await GetAddress(coords);
    setAddress(myAddress.results[0].formatted_address);
    setModalVisible(true);
  };

  const useLocationCurrent = async () => {
    const myAddress = await GetAddress(initialPosition);
    setAddress(myAddress.results[0].formatted_address);
    setModalVisible(true);
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.containerModal}>
          <Text style={styles.titleModal}>
            ¿Esta es la dirección del punto de recolección?
          </Text>
          <Text style={styles.textAddress}>{address}</Text>
          <View style={styles.containerBtnsModal}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnsModal}
              onPress={() =>
                navigation.navigate('SuggestionPoint', {
                  addressNewPoint: address,
                })
              }>
              <Text>SI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnsModal}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(208,201,192,0.9)',
  },
  titleModal: {
    color: PalleteColors.secundaryDark,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textAddress: {
    color: PalleteColors.primaryDark,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  containerBtnsModal: {
    flexDirection: 'row',
  },
  btnsModal: {
    backgroundColor: PalleteColors.primaryDark,
    marginHorizontal: 15,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
