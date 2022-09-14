import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ButtonBack = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{...styles.btnBack, top: top + 10}}
      activeOpacity={0.8}
      onPress={() => navigation.pop()}>
      <Icon size={30} name="arrow-undo-outline" />
    </TouchableOpacity>
  );
};

export default ButtonBack;

const styles = StyleSheet.create({
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
});
