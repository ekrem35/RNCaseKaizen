import axios from './axios';

import {to} from './to';

export async function getAllPromotions() {
  const response = axios.get('promotions/list?Channel=PWA', {
    headers: {
      'X-Country-Id': 'TR',
      'X-Language-Id': 'TR',
    },
  });

  return await to(response);
}

export async function getPromotion(promotionId: number) {
  const response = axios.get(`promotions?Id=${promotionId}`, {
    headers: {
      'X-Country-Id': 'TR',
      'X-Language-Id': 'TR',
    },
  });

  return await to(response);
}
