import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {PermissionsContext} from '../context/PermissionsContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {PalleteColors} from '../themes/PaletteColors';

const width = Dimensions.get('window').width;

interface CarouselItem {
  title: string;
  desc: string;
  img: ImageSourcePropType;
}

const PermissionsScreen = () => {
  const [positionCarousel, setPositionCarousel] = useState(0);
  const {askLocationPermission} = useContext(PermissionsContext);
  const items: CarouselItem[] = [
    {
      title: '¡Bienvenido!',
      desc: '¡Eyy! que buena onda, gracias por querer hacer de Bogotá una ciudad mas limpia.',
      img: require('../assets/Welcome.png'),
    },
    {
      title: 'APP Nombre',
      desc: 'En esta app podrás ver diferentes puntos de recolección que se encuentren en tu localidad, también si tienes conocimiento de otros puntos de recolección puedes hacernos una sugerencia ',
      img: require('../assets/Points.png'),
    },
    {
      title: 'Permisos',
      desc: 'Para poder hacer uso de la app danos permiso para acceder a tu ubicación ',
      img: require('../assets/Map.png'),
    },
  ];

  const renderItem = (item: CarouselItem) => {
    return (
      <View style={styles.itemCarousel}>
        <Image source={item.img} style={styles.itemImg} />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDes}>{item.desc}</Text>
        {item.title === 'Permisos' && (
          <TouchableOpacity
            onPress={askLocationPermission}
            style={styles.buttonPermission}>
            <Text style={styles.buttonTextPermission}>Dar Permiso</Text>
            <Icon name={'locate-outline'} size={20} />
          </TouchableOpacity>
        )}
        <View style={styles.containerPoints}>
          <View
            style={[
              styles.points,
              positionCarousel === 0
                ? {
                    backgroundColor: PalleteColors.primaryDark,
                    borderRadius: 5,
                  }
                : {
                    backgroundColor: PalleteColors.secundaryLight,
                    borderRadius: 5,
                  },
            ]}
          />
          <View
            style={[
              styles.points,
              positionCarousel === 1
                ? {
                    backgroundColor: PalleteColors.primaryDark,
                    borderRadius: 5,
                  }
                : {
                    backgroundColor: PalleteColors.secundaryLight,
                    borderRadius: 5,
                  },
            ]}
          />
          <View
            style={[
              styles.points,
              positionCarousel === 2
                ? {
                    backgroundColor: PalleteColors.primaryDark,
                    borderRadius: 5,
                  }
                : {
                    backgroundColor: PalleteColors.secundaryLight,
                    borderRadius: 5,
                  },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Carousel
        width={width}
        data={items}
        scrollAnimationDuration={500}
        onSnapToItem={index => {
          setPositionCarousel(index);
        }}
        renderItem={({item}) => renderItem(item)}
      />
    </SafeAreaView>
  );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
  itemCarousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PalleteColors.primaryLight,
  },
  itemImg: {width: 350, height: 400, resizeMode: 'center'},
  itemTitle: {fontSize: 30, fontWeight: 'bold'},
  itemDes: {fontSize: 16, marginVertical: 15},
  buttonPermission: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PalleteColors.primaryDark,
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  buttonTextPermission: {
    fontSize: 16,
  },
  containerPoints: {
    flexDirection: 'row',
    marginTop: 15,
  },
  points: {
    height: 7,
    width: 7,
    // borderRadius: 100,
    // backgroundColor: PalleteColors.secundaryDark,
    margin: 5,
  },
});
