import { createAsyncThunk } from '@reduxjs/toolkit';
import Logger from '~/utils/helpers/Logger';
import propertiesApi from '~/api/propertiesApi/propertiesApi';
import { RootState } from '../rootReducer';
import { PropertiesList } from './propertiesModel';
import { Property } from '~/api/types';



// this function is used to load all properties
// it is an async thunk that returns a promise
// the promise is resolved with the fetched properties
export const loadAllProperties = createAsyncThunk<
  PropertiesList,
  undefined,
  { state: RootState }
>(
  'properties/loadAllProperties',
  async () => {
    try {
      const response = await propertiesApi.loadAllProperties();
      const data = await response.json();
      return data.properties;
    } catch (error) {
      Logger.trace('loadAllProperties: Error occurred');
      Logger.recordError(error as Error);
    }
  },
);

// this function is used to like a property
// it is an async thunk that returns a promise
// the promise is resolved with the property id
export const onLikeProperty = createAsyncThunk(
  'properties/onLikeProperty',
  async (payload: Property['id']) => {
    console.log('onLikeProperty', payload);
    return payload;
  },
);

// this function is used to dislike a property
// it is an async thunk that returns a promise
// the promise is resolved with the property id
export const onDislikeProperty = createAsyncThunk(
  'properties/onDislikeProperty',
  async (payload: Property['id']) => {
    console.log('onDislikeProperty', payload);
    return payload;
  },
);



