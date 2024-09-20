import axios from 'axios';
import { propertiesApiAxios } from '../Api';
import { NB_PROPERTIES_PER_PAGE } from '../constant';
import { ROUTE_PROPERTIES_ACTIONS } from './routes';

class PropertiesAPI {
  /*get the list of the properties */

  loadAllProperties({
    offset = 0,
  }: { offset: number }) {
    return fetch('/api/properties');
    // return response.data;
    // return propertiesApiAxios.get(
    //   ROUTE_PROPERTIES_ACTIONS,
    //   {
    //     params: {
    //       offset,
    //       limit: NB_PROPERTIES_PER_PAGE
    //     },
    //   },
    // );
  }
}
export default new PropertiesAPI();
