import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RootStackParams} from '../navigator/StackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {PalleteColors} from '../themes/PaletteColors';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'DetailsPoint'> {}

const DetailsPointsScreen = ({route}: Props) => {
  const point = {
    nombre: route.params.Nombre,
    web: route.params.web,
    telefono: route.params.telefono,
    direccion: route.params.direccion,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonBack}>
        <Icon name="arrow-undo-outline" size={30} />
      </TouchableOpacity>
      <Text style={styles.textInfo}>Información</Text>
      <View style={styles.containerSecundary}>
        <View style={styles.containersIconAndText}>
          <Icon
            size={21}
            color={PalleteColors.primaryDark}
            name="flower-outline"></Icon>
          <Text style={styles.text}>{point.nombre}</Text>
        </View>
        <View style={styles.containersIconAndText}>
          <Icon
            size={21}
            color={PalleteColors.primaryDark}
            name="flower-outline"></Icon>
          <Text style={styles.text}>{point.direccion}</Text>
        </View>
        <View style={styles.containersIconAndText}>
          <Icon
            size={21}
            color={PalleteColors.primaryDark}
            name="flower-outline"></Icon>

          <Text style={styles.text}>{point.telefono}</Text>
        </View>
        <View style={styles.containersIconAndText}>
          <Icon
            size={21}
            color={PalleteColors.primaryDark}
            name="flower-outline"></Icon>

          <Text style={styles.text}>{point.web}</Text>
        </View>
        <TouchableOpacity style={styles.buttonGO}>
          <Icon name="navigate-outline" />
          <Text>Ir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsPointsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: PalleteColors.primaryLight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containersIconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerSecundary: {
    padding: 15,
    width: '70%',
    height: '50%',
    justifyContent: 'space-between',
    backgroundColor: PalleteColors.secundaryLight,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  buttonGO: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PalleteColors.secundaryLight,
    borderColor: PalleteColors.primaryDark,
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 18,
    marginLeft: 5,
    color: PalleteColors.primaryDark,
  },
  textInfo: {
    fontSize: 25,
    color: PalleteColors.primaryDark,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
