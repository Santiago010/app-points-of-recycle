import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {PalleteColors} from '../themes/PaletteColors';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useForm} from '../hooks/useForm';
import {useNavigation} from '@react-navigation/native';

const SuggestionPointScreen = () => {
  const navigate = useNavigation();
  const [showContainerPhoto, setShowContainerPhoto] = useState(false);
  const {name, email, location, phone, web, address, onChange, form} = useForm({
    name: '',
    email: '',
    location: '',
    phone: '',
    web: '',
    address: '',
  });
  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) return;
        console.log(resp.assets[0].uri);
        // setTempUri(resp.assets[0].uri);
        // uploadImage(resp, _id);
      },
    );
  };

  const takePhotoFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) return;

        console.log(resp.assets[0].uri);
        // setTempUri(resp.assets[0].uri);
        // uploadImage(resp, _id);
      },
    );
  };

  const sendSuggestion = () => {
    console.log(form);
  };

  return (
    <View style={styles.container}>
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
        <View style={styles.containerBtnsPhoto}>
          <Text style={styles.titlePhoto}>Subir Foto</Text>
          <TouchableOpacity style={styles.btnPhoto} onPress={takePhoto}>
            <Icon
              color={PalleteColors.primaryLight}
              name="camera-outline"
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnPhoto}
            onPress={takePhotoFromGallery}>
            <Icon
              color={PalleteColors.primaryLight}
              name="image-outline"
              size={30}
            />
          </TouchableOpacity>
        </View>
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
    // justifyContent: 'center',
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
    color: PalleteColors.secundaryLight,
    fontSize: 18,
    marginVertical: 10,
  },
  containerAddress: {
    flexDirection: 'row',
    marginVertical: 5,
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
    color: PalleteColors.secundaryLight,
    fontSize: 18,
  },
  containerBtnsPhoto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  titlePhoto: {
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
  },
  btnPhoto: {
    backgroundColor: PalleteColors.primaryDark,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 30,
  },
  btnSend: {
    padding: 10,
    backgroundColor: PalleteColors.primaryDark,
    borderColor: PalleteColors.secundaryDark,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 10,
  },
  textSend: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
