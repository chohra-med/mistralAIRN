import { createSlice } from '@reduxjs/toolkit';

import * as  propertiesActions from './propertiesActions';
import * as
  propertiesSelectors from './propertiesSelectors';
import { PropertiesList } from './propertiesModel';
import { Property } from '~/api/types';


type PropertiesState = {
  // propertiesList is an array of properties
  propertiesList: PropertiesList;
  // likedProperties is an array of property ids
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
    // add case for loadAllProperties
    // we set the propertiesList to the properties list returned by the api
    builder.addCase(
      propertiesActions.loadAllProperties.fulfilled,
      (state, action) => {
        state.propertiesList = action.payload;
        return state;

      }
    );
    // add case for onLikeProperty
    // we add the property id to the likedProperties list
    builder.addCase(
      propertiesActions.onLikeProperty.fulfilled,
      (state, action) => {
        state.likedProperties.push(action.payload);

        return state;
      },
    );
    // add case for onDislikeProperty
    // we remove the property id from the likedProperties list
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



