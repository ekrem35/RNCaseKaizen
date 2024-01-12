import React from 'react';

import {SafeAreaView} from 'react-native';

import Header from '../../components/Header';
import TagList from './components/TagList';

export default function Home() {
  return (
    <SafeAreaView>
      <Header />

      <TagList />
    </SafeAreaView>
  );
}
