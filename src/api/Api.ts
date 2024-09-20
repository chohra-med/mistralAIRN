import axios from 'axios';

import {
    API_PROPERTIES,
} from '../utils/configurations/config';
import { AxiosErrorHandler } from '../utils/helpers/axiosHelper';

axios.interceptors.response.use((response) => response, AxiosErrorHandler);
axios.defaults.headers.common.accept = 'application/json';

export const propertiesApiAxios = axios.create({
    baseURL: API_PROPERTIES,
});
