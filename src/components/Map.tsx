import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Location, Points} from '../interfaces/AppInterfaces';
import {PalleteColors} from '../themes/PaletteColors';
import {Fab} from './Fab';

interface Props {
  markets: Points[];
  location: Location;
  changeLocation?: (coords: any) => void;
  showFab: boolean;
  useLocationCurrent?: () => void;
}
const Map = ({
  markets,
  location,
  changeLocation,
  showFab,
  useLocationCurrent,
}: Props) => {
  const navigation = useNavigation();

  return (
    <>
      <MapView
        onPress={ev => changeLocation(ev.nativeEvent.coordinate)}
        showsUserLocation={true}
        style={{flex: 1}}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markets.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: Number(marker.latitud),
              longitude: Number(marker.longitud),
            }}
            title={marker.Nombre}
            description={marker.direccion}
            onPress={() => navigation.navigate('DetailsPoint', marker)}
          />
        ))}
      </MapView>
      {showFab && (
        <Fab
          onPress={useLocationCurrent}
          backgroundColor={PalleteColors.primaryDark}
          colorIcon={PalleteColors.primaryLight}
          style={{
            position: 'absolute',
            bottom: 15,
            right: 15,
          }}>
          <Text>Usar Mi Ubicación Actual</Text>
        </Fab>
      )}
    </>
  );
};

export default Map;
