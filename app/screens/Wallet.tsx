import React from 'react';

import {SafeAreaView, Text} from 'react-native';
import Header from '../components/Header';

export default function Wallet() {
  return (
    <SafeAreaView>
      <Header />
      <Text
        style={{
          letterSpacing: 0.5,
          color: '#1D1E1C',
          fontFamily: 'Helvetica-Medium',
          fontStyle: 'normal',
          fontSize: 72,
          lineHeight: 110,
        }}>
        Wallet
      </Text>
    </SafeAreaView>
  );
}
