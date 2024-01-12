import React, {useEffect, useState} from 'react';

import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import * as tagApi from '../../../api/tags';

interface ITag {
  IconUrl: string;
  Id: number;
  Name: string;
  Rank: number;
}

export default function TagList() {
  const [tags, setTags] = useState<ITag[]>([]);

  const [selectedTag, setSelectedTag] = useState<ITag['Id'] | null>(null);

  const renderItem = ({item}: {item: ITag; index: Number}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedTag(item.Id);
        }}>
        <View
          style={[
            {
              flexDirection: 'row',
              borderRadius: 8,
              borderWidth: 1.5,
              backgroundColor: '#fff',
              padding: 6,
              marginRight: 5,
              alignItems: 'center',
              paddingRight: 12,
            },
            {
              borderColor: selectedTag === item.Id ? '#F40000' : '#ECEEEF',
            },
          ]}>
          <Image
            resizeMode="contain"
            width={24}
            height={24}
            source={{uri: item.IconUrl}}
            borderRadius={8}
          />
          <Text
            style={{
              marginLeft: 8,
            }}>
            {item.Name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (tag: ITag) => String(tag.Id);

  async function getAllTags() {
    const {err, res} = await tagApi.getAllTags();

    if (err) {
      return Alert.alert('Etiket listesinde hata', err.message);
    }

    setTags(res.data);
  }

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <FlatList
      data={tags}
      horizontal
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={5}
      contentContainerStyle={{
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 3,
      }}
    />
  );
}
