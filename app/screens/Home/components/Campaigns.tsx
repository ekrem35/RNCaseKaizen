import React, {useEffect, useRef, useState} from 'react';

import {
  View,
  Image,
  Alert,
  useWindowDimensions,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import RenderHtml from 'react-native-render-html';

import moment from 'moment';

import {useNavigation} from '@react-navigation/native';

import * as promotionApi from '../../../api/promotion';
import {IPromotion} from '../../../types/promotion';
import CampaignPagination from './CampaignPagination';

export default function CampaignList() {
  const navigation = useNavigation();

  const paginationRef = useRef<{
    updateActiveItem: (val: number) => void;
    updateBgColor: (clr: string) => void;
  }>(null);

  const activeItemRef = useRef(0);

  const screenWidth = useWindowDimensions().width;

  const [campaigns, setCampaigns] = useState<IPromotion[]>([]);

  const renderItem = ({item}: {item: IPromotion; index: Number}) => {
    const remainingDate = moment(item.RemainingText, 'DD.MM.YYYY');

    const duration = moment.duration(remainingDate.diff(moment()));

    const daysLeft = parseInt(duration.asDays().toString(), 10);

    const remainingText = daysLeft < 1 ? 'Son Gün' : `${daysLeft} Gün kaldı`;

    return (
      <TouchableWithoutFeedback
        style={{
          borderWidth: 2,
          borderColor: '#F4F6F5',
          borderRadius: 16,
        }}>
        <View
          style={{
            height: 383,
            borderRadius: 16,
          }}>
          <View
            style={[
              {
                height: 362,
                zIndex: 9999,
                backgroundColor: '#fff',
                position: 'absolute',
                borderRadius: 16,
              },
            ]}>
            <View>
              <Image
                resizeMode="cover"
                width={screenWidth - 80}
                height={247}
                source={{uri: item.ImageUrl}}
                resizeMethod="scale"
                style={{
                  marginBottom: Platform.select({ios: 0, android: 1}),
                  borderRadius: 16,
                  borderBottomLeftRadius: 100,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 2,
                  bottom: 4,
                  backgroundColor: '#1D1E1C',
                  padding: 4,
                  paddingHorizontal: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Helvatica',
                  }}>
                  {remainingText}
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 55,
                    height: 55,
                    borderWidth: 5,
                    borderColor: '#fff',
                    borderRadius: 55,
                    zIndex: 999,
                  }}>
                  <Image
                    width={55}
                    height={55}
                    resizeMode="contain"
                    source={{
                      uri: item.BrandIconUrl,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <RenderHtml
                contentWidth={screenWidth - 120}
                baseStyle={{
                  textAlign: 'center',
                }}
                source={{
                  html: item.Title.replace('#ffffff', '#222222'),
                }}
              />

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CampaignDetail', {
                    campaignId: item.Id,
                  })
                }
                style={{
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  marginTop: 6,
                  borderRadius: 8,
                }}>
                <RenderHtml
                  contentWidth={100}
                  baseStyle={{
                    fontWeight: 'bold',
                  }}
                  source={{
                    html: item.ListButtonText.replace(
                      '#ffffff',
                      item.ListButtonTextBackGroudColor,
                    ),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: 42,
              backgroundColor: item.ListButtonTextBackGroudColor,
              zIndex: 1,
              bottom: 8,
              borderRadius: 16,
              transform: [{rotate: '3deg'}],
              position: 'absolute',
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  async function getAllPromotions() {
    const {err, res} = await promotionApi.getAllPromotions();

    if (err) {
      return Alert.alert('Kampanya listesinde hata', err.message);
    }

    setCampaigns(res.data);
  }

  const onSnapToItem = (index: number) => {
    activeItemRef.current = index;

    paginationRef.current?.updateActiveItem(index);
    paginationRef.current?.updateBgColor(
      campaigns.find((_, idx) => idx === activeItemRef.current)
        ?.ListButtonTextBackGroudColor || '#222',
    );
  };

  const getCarouselItemLayout = (_: any, index: number) => ({
    length: campaigns.length * screenWidth,
    offset: screenWidth * index,
    index,
  });

  const keyExtractor = (item: IPromotion) => String(item.Id);

  useEffect(() => {
    getAllPromotions();
  }, []);

  return (
    <View>
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={378}
        inactiveSlideOpacity={1}
        itemWidth={screenWidth - 80}
        data={campaigns}
        renderItem={renderItem}
        onSnapToItem={onSnapToItem}
        getItemLayout={getCarouselItemLayout}
        keyExtractor={keyExtractor}
        initialNumToRender={3}
      />

      <CampaignPagination
        onRef={ref => (paginationRef.current = ref)}
        dotsLength={campaigns.length}
      />
    </View>
  );
}
