import {useNavigation} from '@react-navigation/native';
import {Text} from '@ui-kitten/components';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IonIcons from 'react-native-vector-icons/Ionicons';

const CartHeader = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header_container}>
      <View
        style={{
          width: '63%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcons
            name="chevron-back"
            color={'#fff'}
            size={24}
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>

        <Text style={styles.header_text}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    height: 100,
    width: '100%',
    backgroundColor: '#FFA451',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_text: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: '#fff',
  },
});

export default CartHeader;
