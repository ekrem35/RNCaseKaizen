import React, {useEffect, useState} from 'react';

import {Pagination} from 'react-native-snap-carousel';

type Props = {
  dotsLength: number;
  onRef?: (value: {
    updateActiveItem: (idx: number) => void;
    updateBgColor: (val: string) => void;
  }) => void;
};

export default function CampaignPagination(props: Props) {
  const {dotsLength, onRef} = props;

  const [activeItem, setActiveItem] = useState(0);
  const [bgColor, setBgColor] = useState('#F20');

  function updateActiveItem(idx: number) {
    setActiveItem(idx);
  }

  function updateBgColor(color: string) {
    setBgColor(color);
  }

  useEffect(() => {
    if (onRef !== undefined) {
      onRef({updateActiveItem, updateBgColor});
    }
  }, []);

  return (
    <Pagination
      dotsLength={dotsLength}
      activeDotIndex={activeItem}
      dotContainerStyle={{
        width: 10,
      }}
      dotStyle={{
        width: 19,
        height: 8,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: bgColor,
      }}
      inactiveDotStyle={{
        backgroundColor: '#a4a4a4',
        width: 8,
      }}
    />
  );
}
