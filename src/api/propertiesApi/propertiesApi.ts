import axios from 'axios';
import { propertiesApiAxios } from '../Api';
import { NB_PROPERTIES_PER_PAGE } from '../constant';
import { ROUTE_PROPERTIES_ACTIONS } from './routes';

class PropertiesAPI {
  /*get the list of the properties */

  loadAllProperties() {
    // we use mock data for now using miragejs
    return fetch(ROUTE_PROPERTIES_ACTIONS);

  }
}
export default new PropertiesAPI();
