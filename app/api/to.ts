import {AxiosResponse} from 'axios';

export function to(axiosResponse: Promise<AxiosResponse<any, any>>) {
  return axiosResponse
    .then(value =>
      Promise.resolve({
        err: null,
        res: value,
      }),
    )
    .catch(err => Promise.resolve({err: err as Error, res: null}));
}
