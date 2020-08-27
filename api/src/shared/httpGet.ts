import axios, { AxiosRequestConfig } from 'axios';

import { config } from './../config';

const httpGet = async (url: string, params?: any) => {
  const options: AxiosRequestConfig = {
    url,
    params,
    method: 'GET',
    headers: {
      'X-Api-Key': config.envs.apiKey,
    },
  };

  try {
    const result = await axios(options);

    return result.data;
  } catch (err) {
    return err.response.data;
  }
}

export default httpGet;
