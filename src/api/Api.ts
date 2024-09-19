import axios from 'axios';

import {
    API_BLOCKS,
    API_TRANSACTIONS,
} from '../utils/configurations/config';
import { AxiosErrorHandler } from '../utils/helpers/axiosHelper';

axios.interceptors.response.use((response) => response, AxiosErrorHandler);
axios.defaults.headers.common.accept = 'application/json';

export const transactionApiAxios = axios.create({
    baseURL: API_TRANSACTIONS,
});
export const blockApiAxios = axios.create({
    baseURL: API_BLOCKS,
});
