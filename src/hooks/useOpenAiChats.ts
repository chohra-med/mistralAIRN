import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useActions from '~/hooks/useActions';
import { propertiesActions, propertiesSelectors } from '~/redux/properties/properties';


export const useProperties = () => {
    const properties = useSelector(propertiesSelectors.selectAllProperties);

    const [loadAllProperties] = useActions([propertiesActions.loadAllProperties]);

    useEffect(() => {
        loadAllProperties()
    }, [loadAllProperties]);


    return { properties };
};
