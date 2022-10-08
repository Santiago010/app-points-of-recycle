import React from 'react';
import {Modal} from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[];
  modalVisible: boolean;
}

const ModalApp = ({children, modalVisible}: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      {children}
    </Modal>
  );
};

export default ModalApp;
