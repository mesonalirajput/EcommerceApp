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
// import {
//   useItemCountContext,
//   useAddItemCountContext,
//   useSubtractItemCountContext,
// } from '../src/Contexts/CartContext';
import CartContext from '../src/Contexts/TestContext';

const searchFilter = (q, list) => {
  let theList = [...list];
  let newList = [];

  theList.forEach(item => {
    if (item?.title.toLowerCase().includes(q.toLowerCase())) {
      newList.push(item);
    }
  });
  return newList || [];
};

const sortFilter = (type, name, list) => {
  let theList = [...list];
  // console.log('type', type);
  // console.log('name', name);
  let sortType = 0;

  if (name === 'Highest first' || name === 'Descending') {
    sortType = 1;
  }
  // console.log('sortType:', sortType);

  if (type === 'price') {
    if (!sortType) {
      return theList.sort((a, b) => a[type] - b[type]);
    } else {
      return theList.sort((a, b) => b[type] - a[type]);
    }
  }
  if (type === 'title') {
    if (!sortType) {
      return theList.sort((a, b) => a[type] > b[type]);
    } else {
      return theList.sort((a, b) => b[type] > a[type]);
    }
  }
};

const LandingScreen = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filterOpened, setFilterOpened] = useState(false);
  const [currentFilterName, setCurrentFilterName] = useState('');
  const [currentFilterType, setCurrentFilterType] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const [focused, setFocused] = useState(false);
  const renderProductItem = ({item}) => (
    <CartContext.Consumer>
      {({cart, updateCart}) => {
        const inCart = cart[item.id];
        return (
          <ProductItem item={item} inCart={inCart} updateCart={updateCart} />
        );
      }}
    </CartContext.Consumer>
  );
  const refRBSheet = useRef();
  const renderIcon = () => (
    <Feather name="search" color={'#86869E'} size={24} />
  );
  const navigation = useNavigation();
  const filterOpenFunction = () => {
    refRBSheet.current.open();
    setFilterOpened(true);
    // setShowFilter(false);
  };

  const filterCloseFunction = () => {
    refRBSheet.current.close();
    setFilterOpened(false);
  };

  const setFilter = (name, type) => {
    setCurrentFilterName(name);
    setCurrentFilterType(type);
    filterCloseFunction();
    setShowFilter(true);
    // console.log(name, type);
    // setShowFilter(false);
  };

  const clearFilter = () => {
    filterCloseFunction();
    setShowFilter(true);
    setCurrentFilterName('');
    setCurrentFilterType('');
  };

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

  console.log('log: ', currentFilterName, currentFilterType, showFilter);

  // let dataList = searchList;

  // console.log(showFilter && currentFilterType);

  return (
    <Layout style={styles.landingScreen_container}>
      <View style={styles.topView}>
        <TouchableOpacity>
          <MaterialIcons name="sort" color="#070648" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <CartContext.Consumer>
            {context => {
              let cCount = Object.values(context.cart).length;
              if (!cCount) {
                return null;
              }
              return (
                <View style={styles.cart_popup}>
                  <Text style={styles.cart_popup_txt}>{cCount}</Text>
                </View>
              );
            }}
          </CartContext.Consumer>
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
          <FilterComponent
            setFilter={setFilter}
            currentFilterName={currentFilterName}
            currentFilterType={currentFilterType}
            clearFilter={clearFilter}
          />
        </RBSheet>
      </Layout>
      <View style={styles.flatlist_container}>
        <FlatList
          data={dataList}
          renderItem={renderProductItem}
          keyExtractor={(item, idx) => JSON.stringify(item) || idx?.toString()}
          horizontal={false}
          numColumns={2}
        />
      </View>

      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
    </Layout>
  );
};

const FilterComponent = ({
  setFilter,
  clearFilter,
  currentFilterName,
  currentFilterType,
}) => {
  const [selectedFilter, setSelectedFilter] = useState({
    name: currentFilterName,
    type: currentFilterType,
  });

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
          currentFilterName={selectedFilter?.name}
          onPress={() =>
            setSelectedFilter({name: 'Lowest first', type: 'price'})
          }
        />
        <FilterList
          title={'Highest first'}
          currentFilterName={selectedFilter?.name}
          onPress={() =>
            setSelectedFilter({name: 'Highest first', type: 'price'})
          }
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
          currentFilterName={selectedFilter?.name}
          onPress={() => setSelectedFilter({name: 'Ascending', type: 'title'})}
        />
        <FilterList
          title={'Descending'}
          currentFilterName={selectedFilter?.name}
          onPress={() => setSelectedFilter({name: 'Descending', type: 'title'})}
        />
      </View>
      <Divider />
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.clear_btn} onPress={clearFilter}>
          <Text style={styles.clear_txt}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.show_btn}
          onPress={() => {
            setFilter(selectedFilter.name, selectedFilter.type);
          }}>
          <Text style={styles.show_txt}>Show</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const ProductItem = ({item, inCart, updateCart}) => {
  const [isLoading, setIsLoading] = useState(true);

  let title = item.title;
  let price = item.price;
  let image = item.image;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    () => {
      return timeout && clearTimeout(timeout);
    };
  }, []);

  return (
    <Layout style={styles.productItem_container}>
      <SkeletonContent
        isLoading={isLoading}
        containerStyle={{flex: 1, width: '100%'}}
        animationDirection="horizontalRight"
        // boneColor="#F3F4F9"
        layout={[
          {
            width: '100%',
            height: 110,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          },
          {
            width: '85%',
            height: 18,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 30,
            marginLeft: 10,
          },
          {
            width: '75%',
            height: 18,
            borderRadius: 30,
            marginLeft: 10,
          },
        ]}>
        <Image
          // onLoadEnd={() => setImageLoading(false)}
          style={styles.product_image}
          source={{
            uri: image,
          }}
        />
        <View style={styles.product_name_container}>
          <Text style={styles.product_name}>{title.slice(0, 13)}...</Text>
        </View>
        <View style={styles.price_container}>
          <Text style={styles.price}>₹ {price}</Text>
          {!inCart ? (
            <TouchableOpacity
              style={styles.plus_container}
              onPress={() => updateCart(item, 'plus')}>
              <AntDesign name="plus" size={15} color="#FFA451" />
            </TouchableOpacity>
          ) : (
            <View style={styles.item_num_container}>
              <TouchableOpacity onPress={() => updateCart(item, 'plus')}>
                <AntDesign name="plus" size={14} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.product_count}>{inCart?.count}</Text>
              <TouchableOpacity onPress={() => updateCart(item, 'minus')}>
                <AntDesign name="minus" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SkeletonContent>
    </Layout>
  );
};

const ProductItemmMmemo = React.memo(ProductItem);

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
  cart_popup: {
    width: 15,
    height: 15,
    borderRadius: 30,
    backgroundColor: '#FFA451',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    color: '#fff',
    zIndex: 1,
    left: 12,
  },
  cart_popup_txt: {
    fontSize: 10,
    color: '#fff',
    lineHeight: 15,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Medium',
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
    fontFamily: 'AvenirNext-Medium',
    color: '#86869E',
  },
  focused_search_input: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    // backgroundColor: '#ccc',
    width: 190,
    color: '#000',
    fontFamily: 'AvenirNext-Medium',
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
    width: '90%',
    height: 110,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'contain',
    margin: 5,
    marginBottom: 0,
  },
  product_name_container: {
    width: '80%',
    marginTop: 7,
    marginBottom: 7,
    height: 24,
    // backgroundColor: '#ccc',
    marginLeft: 15,
  },
  product_name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#27214D',
    lineHeight: 24,
    fontFamily: 'AvenirNext-Medium',
  },
  price_container: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  price: {
    fontSize: 12,
    // fontWeight: '700',
    lineHeight: 16,
    color: '#222222',
    fontFamily: 'AvenirNext-Bold',
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
    // fontWeight: '600',
    color: '#fff',
    marginLeft: 3,
    marginRight: 3,
    fontFamily: 'AvenirNext-Bold',
  },
  price_text: {
    fontSize: 18,
    lineHeight: 24,
    // fontWeight: '700',
    color: '#B0B0B0',
    marginLeft: 25,
    fontFamily: 'AvenirNext-DemiBold',
  },
  name_text: {
    fontSize: 18,
    lineHeight: 24,
    // fontWeight: '700',
    color: '#B0B0B0',
    marginLeft: 25,
    marginTop: 15,
    fontFamily: 'AvenirNext-DemiBold',
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

export default LandingScreen;
