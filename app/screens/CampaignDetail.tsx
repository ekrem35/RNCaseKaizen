import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Image,
  View,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import * as promotionApi from '../api/promotion';
import {IPromotion} from '../types/promotion';

import RenderHTML from 'react-native-render-html';

import backBtnImg from '../images/backButton.png';
import {useNavigation} from '@react-navigation/native';

type Props = {
  route: {
    params: {
      campaignId: number;
    };
  };
};

export default function CampaignDetail(props: Props) {
  const navigation = useNavigation();

  const {campaignId} = props.route.params;

  const [promotion, setPromotion] = useState<IPromotion>();

  async function getPromotion() {
    const {err, res} = await promotionApi.getPromotion(campaignId);

    if (err) {
      return Alert.alert('Kampanya datayında hata', err.message);
    }

    setPromotion(res.data);
  }

  useEffect(() => {
    getPromotion();
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingBottom: 80,
      }}>
      <ScrollView>
        {promotion === undefined ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            <View
              style={{
                position: 'absolute',
                top: 15,
                left: 15,
                zIndex: 9999,
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={backBtnImg} />
              </TouchableOpacity>
            </View>

            <View>
              <Image
                source={{uri: promotion.ImageUrl}}
                width={Dimensions.get('screen').width}
                height={315}
                style={{
                  borderBottomLeftRadius: 100,
                }}
              />
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
                      uri: promotion.BrandIconUrl,
                    }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                padding: 15,
              }}>
              <View>
                <RenderHTML
                  contentWidth={Dimensions.get('screen').width}
                  baseStyle={{
                    fontWeight: 'bold',
                    fontSize: 24,
                  }}
                  source={{
                    html: promotion.Title.replace('#ffffff', '#222222'),
                  }}
                />
              </View>

              <View>
                <RenderHTML
                  contentWidth={Dimensions.get('screen').width}
                  source={{
                    html: promotion.Description.replace('#ffffff', '#222222'),
                  }}
                />
              </View>

              {promotion.PromotionDetailItemAreas.map((details, idx) => (
                <View style={{marginTop: 24}} key={String(idx)}>
                  <RenderHTML
                    contentWidth={Dimensions.get('screen').width}
                    source={{
                      html: details.Title,
                    }}
                  />

                  <RenderHTML
                    baseStyle={{marginTop: 12}}
                    contentWidth={Dimensions.get('screen').width}
                    source={{
                      html: details.Description,
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {promotion && (
        <TouchableOpacity
          style={{
            backgroundColor: '#f00000',
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 15,
            borderRadius: 32,
          }}>
          <Text style={{color: '#fff'}}>Hemen Katıl</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
