import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Layout, Text, Divider} from '@ui-kitten/components';
import FilterList from './FilterList';

const FilterBottomSheet = () => {
  const [currentFilterName, setCurrentFilterName] = useState('');
  const [currentFilterType, setCurrentFilterType] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const filterCloseFunction = () => {
    refRBSheet.current.close();
    setFilterOpened(false);
  };
  return (
    <Layout style={styles.filter_component_container}>
      <Text style={styles.price_text}>Price</Text>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginBottom: 10,
          marginTop: 5,
        }}>
        <FilterList
          title={'Lowest first'}
          currentFilterName={currentFilterName}
          setCurrentFilterName={setCurrentFilterName}
          setCurrentFilterType={setCurrentFilterType}
          type={'price'}
        />
        <FilterList
          title={'Highest first'}
          currentFilterName={currentFilterName}
          setCurrentFilterName={setCurrentFilterName}
          setCurrentFilterType={setCurrentFilterType}
          type={'price'}
        />
      </View>
      <Divider />
      <Text style={styles.name_text}>Name</Text>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginBottom: 5,
          marginTop: 5,
        }}>
        <FilterList
          title={'Ascending'}
          currentFilterName={currentFilterName}
          setCurrentFilterName={setCurrentFilterName}
          setCurrentFilterType={setCurrentFilterType}
          type={'title'}
        />
        <FilterList
          title={'Descending'}
          currentFilterName={currentFilterName}
          setCurrentFilterName={setCurrentFilterName}
          setCurrentFilterType={setCurrentFilterType}
          type={'title'}
        />
      </View>
      <Divider />
      <View style={styles.button_container}>
        <TouchableOpacity
          style={styles.clear_btn}
          onPress={() => {
            filterCloseFunction();
            setShowFilter(false);
            setCurrentFilterName('');
            setCurrentFilterType('');
          }}>
          <Text style={styles.clear_txt}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.show_btn}
          onPress={() => {
            filterCloseFunction();
            setShowFilter(true);
          }}>
          <Text style={styles.show_txt}>Show</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  filter_component_container: {
    flex: 1,
  },
  button_container: {
    // width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
  },
  clear_btn: {
    width: 150,
    height: 50,
    borderWidth: 1,
    borderColor: '#FFA451',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // marginLeft: 20,
  },
  clear_txt: {
    color: '#FFA451',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Medium',
  },
  show_btn: {
    width: 150,
    height: 50,
    backgroundColor: '#FFA451',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // marginRightt: 20,
  },
  show_txt: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Medium',
  },
});

export default FilterBottomSheet;
