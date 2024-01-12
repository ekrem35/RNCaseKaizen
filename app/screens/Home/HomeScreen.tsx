import React from 'react';

import {SafeAreaView, ScrollView, View} from 'react-native';

import Header from '../../components/Header';
import TagList from './components/TagList';
import CampaignList from './components/Campaigns';

export default function Home() {
  return (
    <SafeAreaView>
      <Header />

      <ScrollView>
        <TagList />

        <View
          style={{
            marginTop: 20,
          }}>
          <CampaignList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
