import React from 'react';
import ModalApp from './ModalApp';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {PalleteColors} from '../themes/PaletteColors';

interface Props {
  modalVisible: boolean;
  address: string;
  navigateSuggestionPoint: () => void;
  setModalVisible: () => void;
}

const ModalQuestionAddress = ({
  modalVisible,
  address,
  navigateSuggestionPoint,
  setModalVisible,
}: Props) => {
  return (
    <ModalApp modalVisible={modalVisible}>
      <View style={styles.containerModal}>
        <Text style={styles.titleModal}>
          ¿Esta es la dirección del punto de recolección?
        </Text>
        <Text style={styles.textAddress}>{address}</Text>
        <View style={styles.containerBtnsModal}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnsModal}
            onPress={navigateSuggestionPoint}>
            <Text>SI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnsModal}
            onPress={setModalVisible}>
            <Text>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalApp>
  );
};

export default ModalQuestionAddress;

const styles = StyleSheet.create({
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
