import React from 'react';
import {Modal, View} from 'react-native';
import {Spinner} from '@ui-kitten/components';

const MainLoader = ({loading}) => {
  return (
    <Modal visible={loading} transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Spinner status={'basic'} />
      </View>
    </Modal>
  );
};

export default MainLoader;
