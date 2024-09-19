import { createSlice } from '@reduxjs/toolkit';

import * as  blocksActions from './blocksActions';
import * as blocksSelectors from './blocksSelectors';
import blocksAdapter from './blocksAdapter';

const initialState = blocksAdapter.getInitialState();

const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      blocksActions.loadAllBlocks.fulfilled,
      (state, action) => {
        if (action.payload) {
          const { data } = action.payload;

          blocksAdapter.setAll(state, data)
        }
      }
    );
    builder.addCase(
      blocksActions.onNewBlockAdded.fulfilled,
      (state, action) => {
        blocksAdapter.addMany(state, action.payload);
        return state;
      },
    );


  },
});

export { blocksActions, blocksSelectors };

export default blocksSlice.reducer;



