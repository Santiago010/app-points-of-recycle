import {useNavigation} from '@react-navigation/native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Points} from '../interfaces/AppInterfaces';

interface Props {
  markets: Points[];
}
const Map = ({markets}: Props) => {
  const navigation = useNavigation();
  return (
    <>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 4.713289713579493,
          longitude: -74.07962773684058,
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
    </>
  );
};

export default Map;
