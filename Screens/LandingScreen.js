import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Divider, Input, Layout, Text} from '@ui-kitten/components';
import RBSheet from 'react-native-raw-bottom-sheet';
import {FilterList} from '../src/components';
import {useNavigation} from '@react-navigation/native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import myData from '../myData.json';

const searchFilter = (q, list) => {
  let newList = [];

  list.forEach(item => {
    if (item?.title.toLowerCase().includes(q.toLowerCase())) {
      newList.push(item);
    }
  });
  return newList || [];
};

const sortFilter = (type, name, list) => {
  // console.log('type', type);
  // console.log('name', name);
  let sortType = 0;

  if (name === 'Highest first' || name === 'Descending') {
    sortType = 1;
  }
  // console.log('sortType:', sortType);

  if (type === 'price') {
    if (!sortType) {
      return list.sort((a, b) => a[type] - b[type]);
    } else {
      return list.sort((a, b) => b[type] - a[type]);
    }
  }
  if (type === 'title') {
    if (!sortType) {
      return list.sort((a, b) => a[type] > b[type]);
    } else {
      return list.sort((a, b) => b[type] > a[type]);
    }
  }
};

const LandingScreen = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filterOpened, setFilterOpened] = useState(false);
  const [currentFilterName, setCurrentFilterName] = useState('');
  const [currentFilterType, setCurrentFilterType] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [focused, setFocused] = useState(false);
  const renderProductItem = ({item}) => <ProductItem item={item} />;
  const refRBSheet = useRef();
  const renderIcon = () => (
    <Feather name="search" color={'#86869E'} size={24} />
  );
  const navigation = useNavigation();
  const filterOpenFunction = () => {
    refRBSheet.current.open();
    setFilterOpened(true);
  };

  const filterCloseFunction = () => {
    refRBSheet.current.close();
    setFilterOpened(false);
  };

  const FilterComponent = () => (
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
            setShowFilter(false);
            setCurrentFilterName('');
            setCurrentFilterType('');
            filterCloseFunction();
          }}>
          <Text style={styles.clear_txt}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.show_btn}
          onPress={() => {
            setShowFilter(true);
            filterCloseFunction();
          }}>
          <Text style={styles.show_txt}>Show</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );

  const crossSearch = () => {
    setFocused(false);
    setSearchInput('');
  };
  // console.log(currentFilterName, currentFilterType, showFilter);

  let searchList = searchInput ? searchFilter(searchInput, myData) : myData;
  let dataList =
    showFilter && currentFilterType
      ? sortFilter(currentFilterType, currentFilterName, searchList)
      : searchList;

  return (
    <Layout style={styles.landingScreen_container}>
      <View style={styles.topView}>
        <TouchableOpacity>
          <MaterialIcons name="sort" color="#070648" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <SimpleLineIcons name="handbag" color="#070648" size={22} />
        </TouchableOpacity>
      </View>
      <Layout style={styles.search_container}>
        {!focused ? (
          <TouchableOpacity
            style={styles.searchbar_container}
            onPress={() => setFocused(true)}
            activeOpacity={0.7}>
            <Feather name="search" color={'#86869E'} size={20} />
            <Text style={styles.search_input}>
              Search for fruit salad combos
            </Text>
            {/* <TextInput
              style={styles.search_input}
              onChangeText={setSearchInput}
              value={searchInput}
              placeholder="Search for fruit salad combos"
              keyboardType="default"
              placeholderTextColor={'#86869E'}
              onFocus={() => setFocused(true)}
            /> */}
          </TouchableOpacity>
        ) : (
          <View style={styles.searchbar_container}>
            <TextInput
              selectionColor={'#d9d9d9'}
              style={styles.focused_search_input}
              onChangeText={setSearchInput}
              value={searchInput}
              // placeholder="Search for fruit salad combos"
              keyboardType="default"
              placeholderTextColor={'#86869E'}
              autoFocus={true}
              // onFocus={()=> setFocused(true)}
            />
            <TouchableOpacity onPress={() => crossSearch()}>
              <Entypo name="circle-with-cross" color={'#070648'} size={20} />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          onPress={() => filterOpenFunction()}
          style={[styles.cell, filterOpened && styles.focusCell]}>
          <Feather
            name="sliders"
            color={filterOpened ? '#FFA451' : '#070648'}
            size={24}
          />
        </TouchableOpacity>
        <RBSheet
          height={400}
          animationType="slide"
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          openDuration={200}
          onClose={() => setFilterOpened(false)}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#DBDBDB',
            },
          }}>
          <FilterComponent />
        </RBSheet>
      </Layout>
      <View style={styles.flatlist_container}>
        <FlatList
          data={dataList}
          renderItem={renderProductItem}
          keyExtractor={(item, idx) => item?.id || idx?.toString()}
          horizontal={false}
          numColumns={2}
        />
      </View>

      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
    </Layout>
  );
};

const INTERVAL_REFRESH = 3000;

const ProductItem = ({item}) => {
  const [isLoading, setIsLoading] = useState(true);

  // only for demo purposes
  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => setIsLoading(true), INTERVAL_REFRESH);
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => setIsLoading(false), INTERVAL_REFRESH);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  const [plus, setPlus] = useState(true);
  const [pCount, setpCount] = useState(0);
  let title = item.title;
  let price = item.price;
  let image = item.image;
  // console.log('image;', image);
  const plusFunction = () => {
    setPlus(false);
    setpCount(pCount + 1);
  };

  const minusFunction = () => {
    if (pCount == 1) {
      setPlus(true);
      setpCount(0);
    } else {
      setpCount(pCount - 1);
    }
  };
  return (
    <Layout style={styles.productItem_container}>
      <SkeletonContent isLoading={isLoading}>
        <Image
          style={styles.product_image}
          source={{
            uri: image,
          }}
        />
      </SkeletonContent>

      <View style={styles.product_name_container}>
        <Text style={styles.product_name}>{title.slice(0, 13)}...</Text>
      </View>
      <View style={styles.price_container}>
        <Text style={styles.price}>₹ {price}</Text>
        {plus ? (
          <TouchableOpacity
            style={styles.plus_container}
            onPress={() => plusFunction()}>
            <AntDesign name="plus" size={15} color="#FFA451" />
          </TouchableOpacity>
        ) : (
          <View style={styles.item_num_container}>
            <TouchableOpacity onPress={() => setpCount(pCount + 1)}>
              <AntDesign name="plus" size={14} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.product_count}>{pCount}</Text>
            <TouchableOpacity onPress={() => minusFunction()}>
              <AntDesign name="minus" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  landingScreen_container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  topView: {
    width: '85%',
    height: 40,
    backgroundColor: '#fff',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  search_container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  searchbar_container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F9',
    borderRadius: 16,
    height: 58,
    width: 250,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  search_input: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
  },
  focused_search_input: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    // backgroundColor: '#ccc',
    width: 190,
    color: '#000',
  },
  cell: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusCell: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF2E7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  flatlist_container: {
    width: '95%',
    flex: 1,
  },
  productItem_container: {
    width: '43%',
    height: 183,
    backgroundColor: '#fff',
    // marginRight: 15,
    marginBottom: 15,
    marginLeft: 17,
    borderRadius: 16,
    shadowColor: '#202020',
    elevation: 15,
    marginTop: 6,
    alignItems: 'center',
  },
  product_image: {
    width: '100%',
    height: 110,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'contain',
  },
  product_name_container: {
    width: '80%',
    marginTop: 8,
    marginBottom: 8,
    height: 24,
    // backgroundColor: '#ccc',
  },
  product_name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#27214D',
    lineHeight: 24,
  },
  price_container: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    color: '#222222',
  },
  plus_container: {
    width: 25,
    height: 24,
    backgroundColor: '#FFF2E7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  item_num_container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 54,
    justifyContent: 'space-evenly',
    backgroundColor: '#FFA451',
    borderRadius: 8,
    height: 24,
  },
  product_count: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 3,
    marginRight: 3,
  },
  price_text: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: '#B0B0B0',
    marginLeft: 25,
  },
  name_text: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: '#B0B0B0',
    marginLeft: 25,
    marginTop: 15,
  },
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
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    borderRadius: 10,
    // marginLeft: 20,
  },
  clear_txt: {
    color: '#FFA451',
  },
  show_btn: {
    width: 150,
    height: 50,
    backgroundColor: '#FFA451',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    borderRadius: 10,
    // marginRightt: 20,
  },
  show_txt: {
    color: '#fff',
  },
});

export default LandingScreen;
