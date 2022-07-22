import React, {useEffect, useState} from 'react';
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
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import CartContext from '../src/Contexts/TestContext';

const CartScreen = () => {
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    () => {
      return timeout && clearTimeout(timeout);
    };
  }, []);

  return (
    <Layout style={styles.cartScreen_container}>
      <CartHeader title={'My Basket'} />
      <CartContext.Consumer>
        {context => {
          let cartDt = Object.values(context.cart) || [];
          return (
            <FlatList
              data={cartDt}
              renderItem={({item}) => (
                <CartItem
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  item={item}
                  updateCart={context.updateCart}
                />
              )}
              keyExtractor={(item, idx) => item?.id || idx?.toString()}
            />
          );
        }}
      </CartContext.Consumer>
      <View style={styles.cart_bottom}>
        <SkeletonContent
          isLoading={isLoading}
          containerStyle={{
            height: 80,
            width: 100,
            // marginBottom: 5,
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
          }}
          animationDirection="horizontalRight"
          layout={[
            {
              width: 40,
              height: 20,
              borderRadius: 12,
            },
            {
              width: 89,
              height: 20,
              borderRadius: 12,
            },
          ]}>
          <View style={styles.left}>
            <Text style={styles.total_txt}>Total</Text>
            <CartContext.Consumer>
              {context => {
                let cartDt = Object.values(context.cart);
                let total = 0;
                cartDt.forEach(item => {
                  total += item.item.price * item.count;
                });
                console.log();
                return (
                  <Text style={styles.price_text}>₹ {total.toFixed()}</Text>
                );
              }}
            </CartContext.Consumer>
          </View>
        </SkeletonContent>
        <TouchableOpacity
          style={[
            styles.checkout_btn,
            isLoading && styles.checkout_loading_btn,
          ]}>
          <Text style={[styles.btn_txt, isLoading && styles.loading_btn_txt]}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={'#FFA451'} barStyle={'dark-content'} />
    </Layout>
  );
};

const CartItem = ({isLoading, setIsLoading, item, updateCart}) => {
  // const [iCount, setiCount] = useState(0);
  const minusFunction = () => {
    if (iCount == 1) {
      setiCount(0);
    } else if (iCount == 0) {
      setiCount(0);
    } else {
      setiCount(iCount - 1);
    }
  };

  let image = item.item.image;
  let price = item.item.price;
  let title = item.item.title;
  let iCount = item.count;
  return (
    <Layout
      style={{
        backgroundColor: '#F5F5F5',
      }}>
      <View style={styles.cartItem_container}>
        <SkeletonContent
          isLoading={isLoading}
          containerStyle={{
            height: 90,
            width: 70,
            // marginBottom: 5,
            alignItems: 'center',
            flexDirection: 'row',
          }}
          animationDirection="horizontalRight"
          layout={[
            {
              width: 64,
              height: 64,
            },
          ]}>
          <Image
            style={styles.cartItem_image}
            source={{
              uri: image,
            }}
          />
        </SkeletonContent>
        <SkeletonContent
          isLoading={isLoading}
          containerStyle={{
            height: 90,
            width: '56%',
            // marginBottom: 5,
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
          }}
          animationDirection="horizontalRight"
          layout={[
            {
              width: 166,
              height: 20,
              borderRadius: 12,
            },
            {
              width: 107,
              height: 20,
              borderRadius: 12,
            },
          ]}>
          <View style={styles.cart_middle}>
            <Text style={styles.item_name} numberOfLines={3}>
              {title}
            </Text>
            <Text style={styles.item_price}>₹ {price}</Text>
          </View>
        </SkeletonContent>
        <SkeletonContent
          isLoading={isLoading}
          containerStyle={{
            height: 90,
            width: 50,
            // marginBottom: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          animationDirection="horizontalRight"
          layout={[
            {
              width: 40,
              height: 20,
              borderRadius: 12,
            },
          ]}>
          <View style={styles.item_list_container}>
            <TouchableOpacity onPress={() => updateCart(item.item, 'plus')}>
              <AntDesign name="plus" size={14} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.item_count}>{iCount}</Text>
            <TouchableOpacity onPress={() => updateCart(item.item, 'minus')}>
              <AntDesign name="minus" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        </SkeletonContent>
      </View>
      <Divider />
    </Layout>
  );
};

const styles = StyleSheet.create({
  cartScreen_container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartItem_container: {
    height: 90,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: '#fff',
  },
  cartItem_image: {
    height: 64,
    width: 64,
    // marginLeft: 15,
    // marginRight: 15,
    resizeMode: 'contain',
  },
  cart_middle: {
    width: 166,
    // backgroundColor: '#fff',
  },
  item_name: {
    fontSize: 14,
    lineHeight: 20,
    color: '#27214D',
    fontFamily: 'AvenirNext-Medium',
  },
  item_price: {
    fontSize: 12,
    lineHeight: 16,
    // fontWeight: '700',
    marginTop: 5,
    color: '#27214D',
    fontFamily: 'AvenirNext-Bold',
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
    // fontWeight: '700',
    color: '#fff',
    marginLeft: 3,
    marginRight: 3,

    fontFamily: 'AvenirNext-Bold',
  },
  cart_bottom: {
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 25,
  },
  left: {
    // backgroundColor: '#ccc',
    width: 130,
  },
  total_txt: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'AvenirNext-DemiBold',
  },
  price_text: {
    fontSize: 24,
    lineHeight: 32,
    // fontWeight: '700',
    color: '#000',
    fontFamily: 'AvenirNext-Bold',
  },
  checkout_btn: {
    width: 190,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA451',
    borderRadius: 10,
  },
  checkout_loading_btn: {
    backgroundColor: '#E1E9EE',
  },
  btn_txt: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'AvenirNext-DemiBold',
  },
  loading_btn_txt: {
    color: '#B0B0B0',
  },
});

export default CartScreen;
