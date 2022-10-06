import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {PalleteColors} from '../themes/PaletteColors';
import Icon from 'react-native-vector-icons/Ionicons';

import {useForm} from '../hooks/useForm';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../firebase';
interface Props extends StackScreenProps<RootStackParams, 'SuggestionPoint'> {}

const SuggestionPointScreen = ({route}: Props) => {
  const navigate = useNavigation();
  const addressNewPoint = route.params.addressNewPoint;
  const [modalVisible, setModalVisible] = useState(false);

  const {name, email, location, phone, web, address, onChange, form} = useForm({
    name: '',
    email: '',
    location: '',
    phone: '',
    web: '',
    address: '',
  });

  const sendSuggestion = async () => {
    console.log(form);
    await addDoc(collection(db, 'sugerencias'), form);
    setModalVisible(true);
  };

  useEffect(() => {
    onChange(addressNewPoint, 'address');
  }, [route]);

  useEffect(() => {
    setTimeout(() => {
      setModalVisible(false);
    }, 5000);
  }, [modalVisible]);

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
            ¡EEEYYY! que buena onda ¡Gracias! por tu sugerencia.
          </Text>
          <Text style={styles.desModal}>
            Estaremos evaluando tu sugerencia.
          </Text>
        </View>
      </Modal>
      <Text style={styles.title}>
        Ingresa la siguiente información para sugerir un punto de recolección:
      </Text>
      <ScrollView style={styles.containerScroll}>
        <TextInput
          onChangeText={value => onChange(value, 'name')}
          value={name}
          placeholder="Nombre..."
          style={styles.textInput}
        />
        <TextInput
          onChangeText={value => onChange(value, 'email')}
          value={email}
          placeholder="Email..."
          style={styles.textInput}
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={value => onChange(value, 'location')}
          value={location}
          placeholder="Localidad..."
          style={styles.textInput}
        />
        <TextInput
          onChangeText={value => onChange(value, 'phone')}
          value={phone}
          placeholder="Telefono..."
          style={styles.textInput}
          keyboardType="number-pad"
        />
        <TextInput
          onChangeText={value => onChange(value, 'web')}
          value={web}
          placeholder="Web..."
          style={styles.textInput}
          keyboardType="web-search"
        />
        <View style={styles.containerAddress}>
          <TextInput
            onChangeText={value => onChange(value, 'address')}
            value={address}
            placeholder="Dirección..."
            style={styles.TextInputAddress}
          />
          <TouchableOpacity
            style={styles.btnAddress}
            activeOpacity={0.8}
            onPress={() => navigate.navigate('MapUserLocation')}>
            <Icon name="locate-outline" size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={sendSuggestion}
          style={styles.btnSend}
          activeOpacity={0.8}>
          <Text style={styles.textSend} onPress={sendSuggestion}>
            Enviar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SuggestionPointScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: PalleteColors.primaryLight,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PalleteColors.secundaryDark,
    textAlign: 'center',
  },
  containerScroll: {
    marginVertical: 20,
    backgroundColor: 'rgba(208, 201, 192, 0.9)',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  textInput: {
    borderColor: PalleteColors.secundaryDark,
    borderWidth: 1,
    backgroundColor: PalleteColors.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: PalleteColors.primaryDark,
    fontSize: 18,
    marginVertical: 15,
  },
  containerAddress: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  btnAddress: {
    backgroundColor: PalleteColors.primaryLight,
    borderColor: PalleteColors.secundaryDark,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  TextInputAddress: {
    width: '85%',
    borderColor: PalleteColors.secundaryDark,
    borderWidth: 1,
    backgroundColor: PalleteColors.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: PalleteColors.primaryDark,
    fontSize: 18,
  },
  btnSend: {
    padding: 10,
    backgroundColor: PalleteColors.primaryDark,
    borderColor: PalleteColors.secundaryDark,
    borderWidth: 1,
    marginVertical: 15,
    borderRadius: 10,
  },
  textSend: {
    fontSize: 18,
    fontWeight: 'bold',
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
  desModal: {
    fontSize: 18,
    color: PalleteColors.primaryDark,
    marginTop: 10,
  },
});
