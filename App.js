import {ApplicationProvider} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import * as eva from '@eva-design/eva';
import Main from './src/navigators/mainStack';
import {NavigationContainer} from '@react-navigation/native';
import CartContext from './src/Contexts/TestContext';

const App = () => {
  const [cart, setCart] = useState({});

  const updateCart = (item, type) => {
    const currentCart = {...cart};
    const currentItem = currentCart[item.id];
    if (!currentItem) {
      currentCart[item.id] = {
        count: 1,
        item,
      };
    } else {
      if (type === 'plus') {
        let newCount = currentItem.count + 1;
        currentCart[item.id] = {
          count: newCount,
          item,
        };
      } else if (type === 'minus') {
        if (currentItem.count === 1) {
          delete currentCart[item.id];
        } else {
          let newCount = currentItem.count - 1;
          currentCart[item.id] = {
            count: newCount,
            item,
          };
        }
      }
    }

    setCart(currentCart);
    console.log('currentCart:', currentCart);
  };

  console.log('cart:', cart);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <CartContext.Provider
          value={{
            cart,
            updateCart,
          }}>
          <Main />
        </CartContext.Provider>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
