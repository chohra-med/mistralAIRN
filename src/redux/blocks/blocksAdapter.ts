import { createEntityAdapter } from '@reduxjs/toolkit';
import { Block } from '~/api/types';

export default createEntityAdapter<Block>({
    selectId: block => block.id,
    sortComparer: (a, b) => a.timestamp - b.timestamp,
});
