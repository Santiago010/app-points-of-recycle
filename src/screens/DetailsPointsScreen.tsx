import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RootStackParams} from '../navigator/StackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {PalleteColors} from '../themes/PaletteColors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ButtonBack from '../components/ButtonBack';

interface Props extends StackScreenProps<RootStackParams, 'DetailsPoint'> {}

const DetailsPointsScreen = ({route, navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const point = {
    nombre: route.params.Nombre,
    web: route.params.web,
    telefono: route.params.telefono,
    direccion: route.params.direccion,
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <ButtonBack />
        {/* <TouchableOpacity
          style={{...styles.btnBack, top: top + 10}}
          activeOpacity={0.8}
          onPress={() => navigation.pop()}>
          <Icon size={30} name="arrow-undo-outline" />
        </TouchableOpacity> */}
        <Text style={{...styles.titleName, top: top + 60}}>{point.nombre}</Text>
        <Image
          source={require('../assets/location.png')}
          style={styles.imagePoint}
        />
      </View>
      <View style={styles.containerInfo}>
        <View style={styles.containerTextAndIco}>
          <Icon
            name="globe-outline"
            size={20}
            color={PalleteColors.primaryDark}
          />
          {point.web ? (
            <Text style={styles.info}>{point.web}</Text>
          ) : (
            <Text style={styles.info}>¡Ups! NO hay página web</Text>
          )}
        </View>
        <View style={styles.containerTextAndIco}>
          <Icon
            name="map-outline"
            size={20}
            color={PalleteColors.primaryDark}
          />
          {point.direccion ? (
            <Text style={styles.info}>{point.direccion}</Text>
          ) : (
            <Text>¡Ups! NO hay dirección</Text>
          )}
        </View>
        <View style={styles.containerTextAndIco}>
          <Icon
            name="call-outline"
            size={20}
            color={PalleteColors.primaryDark}
          />
          {point.telefono ? (
            <Text style={styles.info}>{point.telefono}</Text>
          ) : (
            <Text style={styles.info}>¡Ups! NO hay Telefono</Text>
          )}
        </View>
        <TouchableOpacity style={styles.btnGo} activeOpacity={0.8}>
          <Text style={styles.textBtnGo}>Ver Ruta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsPointsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PalleteColors.primaryLight,
  },
  containerHeader: {
    zIndex: 999,
    alignItems: 'center',
    backgroundColor: PalleteColors.primaryDark,
    height: 350,
    borderBottomRightRadius: 250,
    borderBottomLeftRadius: 250,
  },
  btnBack: {
    position: 'absolute',
    left: 15,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 100,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    alignItems: 'center',
  },
  titleName: {
    color: PalleteColors.primaryLight,
    fontSize: 20,
  },
  imagePoint: {
    top: 65,
    width: 200,
    height: 200,
  },
  containerInfo: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
    justifyContent: 'space-between',
  },
  containerTextAndIco: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnGo: {
    backgroundColor: PalleteColors.primaryDark,
    borderRadius: 100,
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
  },
  textBtnGo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    color: PalleteColors.primaryDark,
    fontSize: 18,
    marginLeft: 10,
  },
});
