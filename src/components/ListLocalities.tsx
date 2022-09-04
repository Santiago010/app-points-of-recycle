import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Localities, localities} from '../assets/ListLocalities';
import Icon from 'react-native-vector-icons/Ionicons';
import {PalleteColors} from '../themes/PaletteColors';
import {useNavigation} from '@react-navigation/native';

interface PropsRenderItem {
  item: Localities;
}

interface PropsItem {
  item: Localities;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
}

const ListLocalities = () => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const navigation = useNavigation();

  const Item = ({item, onPress, backgroundColor, textColor}: PropsItem) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: backgroundColor,
          },
        ]}
        onPress={onPress}>
        <View style={styles.containerOfText}>
          <Text style={styles.itemTextNumberLocation}>
            {item.numberLocation}
          </Text>
          <Text
            style={[
              styles.itemText,
              {
                color: textColor,
              },
            ]}>
            {item.name}
          </Text>
        </View>
        <Icon name="play-outline" size={20} color={textColor} />
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}: PropsRenderItem) => {
    const backgroundColor =
      item.numberLocation === selectedNumber
        ? PalleteColors.primaryDark
        : PalleteColors.primaryLight;
    const textColor =
      item.numberLocation === selectedNumber
        ? PalleteColors.primaryLight
        : PalleteColors.primaryDark;
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate('PointsInMap', {
            nameLocation: item.name,
          });
          setSelectedNumber(item.numberLocation);
        }}
        backgroundColor={backgroundColor}
        textColor={textColor}
      />
    );
  };

  return (
    <FlatList
      data={localities}
      renderItem={renderItem}
      extraData={selectedNumber}
    />
  );
};

export default ListLocalities;

const styles = StyleSheet.create({
  item: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerOfText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemTextNumberLocation: {
    fontSize: 23,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginRight: 5,
  },
});
