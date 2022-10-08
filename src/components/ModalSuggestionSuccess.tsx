import React from 'react';
import ModalApp from './ModalApp';
import {View, Image, Text, StyleSheet} from 'react-native';
import {PalleteColors} from '../themes/PaletteColors';

interface Props {
  modalVisible: boolean;
}

const ModalSuggestionSuccess = ({modalVisible}: Props) => {
  return (
    <ModalApp modalVisible={modalVisible}>
      <View style={styles.containerModal}>
        <Image
          source={require('../assets/thank.png')}
          style={styles.imageModal}
        />
        <Text style={styles.titleModal}>
          ¡EEEYYY! que buena onda ¡Gracias! por tu sugerencia.
        </Text>
        <Text style={styles.desModal}>Estaremos evaluando tu sugerencia.</Text>
      </View>
    </ModalApp>
  );
};

export default ModalSuggestionSuccess;

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(208,201,192,0.9)',
  },
  imageModal: {
    width: 350,
    height: 400,
    resizeMode: 'center',
  },
  titleModal: {
    color: PalleteColors.secundaryDark,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  desModal: {
    fontSize: 18,
    color: PalleteColors.primaryDark,
    marginTop: 10,
  },
});
