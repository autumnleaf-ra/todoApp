import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  json: 'data.json',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    baseURL: config.api.host,
    url: endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const getData = () => callAPI(urls.json, 'get');
