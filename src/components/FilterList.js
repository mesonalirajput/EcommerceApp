import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const FilterList = ({title, currentFilterName, onPress}) => {
  let selected = currentFilterName === title;

  return (
    <TouchableOpacity
      style={[styles.option_view, selected && styles.selected_view]}
      onPress={onPress}>
      <Text style={[styles.option_text, selected && styles.selected_text]}>
        {title}
      </Text>
      {selected ? (
        <MaterialIcons
          name="done"
          color={'#EB8D37'}
          size={24}
          style={{marginRight: 15}}
        />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  option_view: {
    width: '90%',
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  option_text: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginLeft: 10,
    fontFamily: 'AvenirNext-Medium',
    color: '#222',
  },
  selected_view: {
    backgroundColor: '#FFF2E7',
    borderRadius: 12,
  },
  selected_text: {
    color: '#EB8D37',
  },
});
export default FilterList;
