import { createSlice } from '@reduxjs/toolkit';

import * as  propertiesActions from './propertiesActions';
import * as
  propertiesSelectors from './propertiesSelectors';
import { PropertiesList } from './propertiesModel';
import { Property } from '~/api/types';


type PropertiesState = {
  propertiesList: PropertiesList;
  likedProperties: Array<Property['id']>;
};

const initialState: PropertiesState = {
  propertiesList: [],
  likedProperties: [],
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      propertiesActions.loadAllProperties.fulfilled,
      (state, action) => {
        state.propertiesList = action.payload;
        return state;

      }
    );
    builder.addCase(
      propertiesActions.onLikeProperty.fulfilled,
      (state, action) => {
        state.likedProperties.push(action.payload);

        return state;
      },
    );
    builder.addCase(
      propertiesActions.onDislikeProperty.fulfilled,
      (state, action) => {
        state.likedProperties = state.likedProperties.filter(
          (id) => id !== action.payload
        );
        return state;
      },
    );
  },
});

export {
  propertiesActions,
  propertiesSelectors
};

export default propertiesSlice.reducer;



