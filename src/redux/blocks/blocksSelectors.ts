import { Block } from '~/api/types';
import { RootState, } from '../store';
import blocksAdapter from './blocksAdapter';


const blocksSelectors = blocksAdapter.getSelectors<RootState>(
    (state) => state.blocks
)

// And then use the selectors to retrieve values
export const selectAllBlocks = blocksSelectors.selectAll



export const selectBlockById =
    (blockId: Block['id']) => (state: RootState) =>
        blocksSelectors.selectById(state, blockId);



