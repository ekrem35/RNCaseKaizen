import React from 'react';

import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import dahaLogo from '../images/dahaLogo.png';
import profileImg from '../images/profileIcon.png';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Image source={dahaLogo} />
      <TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image source={profileImg} />
          <View style={styles.profileOnlineBadge} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 40,
    paddingBottom: 20,
  },
  profileContainer: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: '#F40000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileOnlineBadge: {
    borderWidth: 2.18,
    backgroundColor: 'green',
    width: 12,
    height: 12,
    borderRadius: 12,
    borderColor: '#fff',
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
