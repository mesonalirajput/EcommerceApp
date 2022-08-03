import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Divider, Layout, Text} from '@ui-kitten/components';
import {CartHeader} from '../src/components';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CartScreen = () => {
  const [cartData, setCartData] = useState(['', '']);

  const renderCartItem = ({item}) => <CartItem />;
  return (
    <Layout style={styles.cartScreen_container}>
      <CartHeader title={'My Basket'} />
      <FlatList
        data={cartData}
        renderItem={renderCartItem}
        keyExtractor={(item, idx) => item || idx?.toString()}
      />
      <View style={styles.cart_bottom}>
        <View style={styles.left}>
          <Text style={styles.total_txt}>Total</Text>
          <Text style={styles.price_text}>₹ 2,000</Text>
        </View>
        <TouchableOpacity style={styles.checkout_btn}>
          <Text style={styles.btn_txt}>Checkout</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={'#FFA451'} barStyle={'dark-content'} />
    </Layout>
  );
};

const CartItem = () => {
  const [iCount, setiCount] = useState(0);
  const minusFunction = () => {
    if (iCount == 1) {
      setiCount(0);
    } else if (iCount == 0) {
      setiCount(0);
    } else {
      setiCount(iCount - 1);
    }
  };
  return (
    <Layout
      style={{
        backgroundColor: '#F5F5F5',
      }}>
      <TouchableOpacity style={styles.cartItem_container}>
        <Image
          style={styles.cartItem_image}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <View style={styles.cart_middle}>
          <Text style={styles.item_name}>Honey lime combo with cereal</Text>
          <Text style={styles.item_price}>₹ 2,000</Text>
        </View>
        <View style={styles.item_list_container}>
          <TouchableOpacity onPress={() => setiCount(iCount + 1)}>
            <AntDesign name="plus" size={14} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.item_count}>{iCount}</Text>
          <TouchableOpacity onPress={() => minusFunction()}>
            <AntDesign name="minus" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Divider />
    </Layout>
  );
};

const styles = StyleSheet.create({
  cartScreen_container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  cartItem_container: {
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 18,
  },
  cartItem_image: {
    height: 53,
    width: 53,
    // marginLeft: 15,
    // marginRight: 15,
  },
  cart_middle: {
    width: '56%',
    // backgroundColor: '#fff',
  },
  item_name: {
    fontSize: 14,
    lineHeight: 20,
    color: '#27214D',
  },
  item_price: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    marginTop: 5,
    color: '#27214D',
  },
  item_list_container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 54,
    justifyContent: 'space-evenly',
    backgroundColor: '#FFA451',
    borderRadius: 8,
    height: 24,
  },
  item_count: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 3,
    marginRight: 3,
  },
  cart_bottom: {
    width: '100%',
    height: 80,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 25,
  },
  // left: {
  //   marginLeft: 20,
  // },
  total_txt: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#000',
  },
  price_text: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: '#000',
  },
  checkout_btn: {
    width: 200,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA451',
    borderRadius: 10,
  },
  btn_txt: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});

export default CartScreen;
