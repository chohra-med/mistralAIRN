import { blockApiAxios } from '../Api';
import { ROUTE_BLOCKS_ACTIONS } from './routes';

class BlocksApi {
  /*get the list of the transactions */
  loadAllBlocks() {
    // We do Api call here
    return blockApiAxios.get(ROUTE_BLOCKS_ACTIONS);
  }
}
export default new BlocksApi();
