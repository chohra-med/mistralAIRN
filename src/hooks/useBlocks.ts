import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useActions from '~/hooks/useActions';
import { blocksActions, blocksSelectors } from '~/redux/blocks/blocks';


export const useBlocks = () => {
    const blocks = useSelector(blocksSelectors.selectAllBlocks);

    const [loadAllBlocks] = useActions([blocksActions.loadAllBlocks]);

    useEffect(() => {
        loadAllBlocks()
    }, [loadAllBlocks]);


    return { blocks };
};
