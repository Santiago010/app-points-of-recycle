import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Location, Points} from '../interfaces/AppInterfaces';
import {useLocation} from '../hooks/useLocation';
import {Text, TouchableOpacity} from 'react-native';

interface Props {
  markets: Points[];
  location: Location;
}
const Map = ({markets, location}: Props) => {
  const navigation = useNavigation();
  const {getLocationCurrent} = useLocation();
  const mapViewRef = useRef<MapView>();

  const locationCenter = async () => {
    const {latitude, longitude} = await getLocationCurrent();
    mapViewRef.current?.animateCamera({
      center: {
        latitude: latitude,
        longitude: longitude,
      },
    });
    let geocoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBi6a1rVILuICtZnx_sd2QTv3-ndTaEdfY`;
    fetch(geocoding)
      .then(res => res.json())
      .then(data => console.log(data.results[0].formatted_address));
  };

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
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
      <TouchableOpacity onPress={locationCenter}>
        <Text>obtener ubicacion</Text>
      </TouchableOpacity>
    </>
  );
};

export default Map;
