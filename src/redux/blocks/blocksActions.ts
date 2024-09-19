import { createAsyncThunk } from '@reduxjs/toolkit';
import Logger from '~/utils/helpers/Logger';
import blockApi from '~/api/blocksApi/blockApi';
import { Block } from '~/api/types';
import { RootState } from '../rootReducer';
import { GetBlocksResponse } from './blocksModel';
import { CURRENT_ENVIRONMENT, ENVIRONMENT } from '~/utils/configurations/config';
import { MOCKED_BLOCKS_DATA } from '~/api/constant';



export const loadAllBlocks = createAsyncThunk<
  GetBlocksResponse,
  undefined,
  { state: RootState }
>(
  'blocks/loadAllBlocks',
  async () => {
    if (CURRENT_ENVIRONMENT === ENVIRONMENT.TESTING) {
      return MOCKED_BLOCKS_DATA
    }
    try {
      const response = await blockApi.loadAllBlocks();
      return response.data;
    } catch (error) {
      Logger.trace('loadAllBlocks: Error occurred');
      Logger.recordError(error as Error);
    }
  },
);


export const onNewBlockAdded = createAsyncThunk(
  'blocks/onNewBlockAdded',
  async (payload: Block[]) => {
    return payload;
  },
);


