import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {PalleteColors} from '../themes/PaletteColors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../firebase';
import ModalSuggestionSuccess from '../components/ModalSuggestionSuccess';
import ModalErrorConnection from '../components/ModalErrorConnection';
import {useNetInfo} from '@react-native-community/netinfo';
import {useFormik} from 'formik';
interface Props extends StackScreenProps<RootStackParams, 'SuggestionPoint'> {}

const SuggestionPointScreen = ({route}: Props) => {
  const netInfo = useNetInfo();
  const navigate = useNavigation();
  const addressNewPoint = route.params.addressNewPoint;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {values, setFieldValue, handleSubmit, errors} = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      web: '',
      address: '',
    },
    onSubmit: async values => {
      if (netInfo.isConnected) {
        setIsLoading(true);
        await addDoc(collection(db, 'sugerencias'), values);
        setIsLoading(false);
        setModalVisible(true);
      } else {
        setModalError(true);
      }
    },
    validate: values => {
      let webPattern =
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      const errorsValues = {};
      if (!values.name || values.name.length < 3) {
        errorsValues.name = 'Nombre inválido';
      }
      if (
        !values.email ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errorsValues.email = 'Email inválido';
      }
      if (
        !values.phone ||
        values.phone.length < 10 ||
        values.phone.length > 13
      ) {
        errorsValues.phone = 'Número de teléfono inválido';
      }
      if (!values.web || webPattern.test(values.web)) {
        errorsValues.web = 'Dirección web inválida';
      }
      if (!values.address) {
        errorsValues.address = 'Dirección inválida';
      }

      // console.log(errorsValues);
      return errorsValues;
    },
  });

  useEffect(() => {
    setFieldValue('address', addressNewPoint);
  }, [route]);

  useEffect(() => {
    setTimeout(() => {
      setModalError(false);
    }, 5000);
  }, [modalError]);

  useEffect(() => {
    setTimeout(() => {
      setModalVisible(false);
    }, 5000);
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <ModalErrorConnection modalVisible={modalError} />
      <ModalSuggestionSuccess modalVisible={modalVisible} />

      <Text style={styles.title}>
        Ingresa la siguiente información para sugerir un punto de recolección:
      </Text>
      <ScrollView style={styles.containerScroll}>
        <TextInput
          onChangeText={value => setFieldValue('name', value)}
          value={values.name}
          placeholder="Nombre..."
          style={styles.textInput}
        />
        {errors.name && <Text style={styles.textErrors}>{errors.name}</Text>}

        <TextInput
          onChangeText={value => setFieldValue('email', value)}
          value={values.email}
          placeholder="Email..."
          style={styles.textInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.textErrors}>{errors.email}</Text>}

        <TextInput
          onChangeText={value => setFieldValue('phone', value)}
          value={values.phone}
          placeholder="Teléfono..."
          style={styles.textInput}
          keyboardType="number-pad"
        />
        {errors.phone && <Text style={styles.textErrors}>{errors.phone}</Text>}

        <TextInput
          onChangeText={value => setFieldValue('web', value)}
          value={values.web}
          placeholder="Web..."
          style={styles.textInput}
          keyboardType="web-search"
          autoCapitalize="none"
        />
        {errors.web && <Text style={styles.textErrors}>{errors.web}</Text>}
        <View>
          <TouchableOpacity
            style={styles.btnAddress}
            activeOpacity={0.8}
            onPress={() => navigate.navigate('MapUserLocation')}>
            <Text style={styles.textBtnAdrress}>Poner Dirección</Text>
            <Icon name="locate-outline" size={20} />
          </TouchableOpacity>
          {errors.address && (
            <Text style={styles.textErrors}>{errors.address}</Text>
          )}
          <TextInput
            editable={false}
            onChangeText={value => setFieldValue('address', value)}
            value={values.address}
            placeholder="Dirección..."
            style={styles.TextInputAddress}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.btnSend}
          activeOpacity={0.8}>
          <Text style={styles.textSend}>Enviar</Text>
        </TouchableOpacity>
        {isLoading && (
          <ActivityIndicator size="large" color={PalleteColors.primaryDark} />
        )}
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
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: 'row',
  },
  textBtnAdrress: {
    fontSize: 18,
  },
  TextInputAddress: {
    borderColor: PalleteColors.secundaryDark,
    borderWidth: 1,
    backgroundColor: PalleteColors.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: PalleteColors.secundaryDark,
    fontSize: 18,
    marginVertical: 10,
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
    textAlign: 'center',
    color: PalleteColors.primaryLight,
  },
  textErrors: {
    fontSize: 16,
    marginHorizontal: 8,
    color: PalleteColors.secundaryDark,
  },
});
