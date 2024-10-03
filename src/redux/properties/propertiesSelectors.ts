import { Property } from '~/api/types';
import { RootState, } from '../store';
import { createSelector } from '@reduxjs/toolkit';


// select All Properties
export const selectAllProperties = (state: RootState) => state.properties.propertiesList;

// select Liked Properties
export const selectLikedProperties = createSelector(
    [
        (state: RootState) => state.properties.propertiesList,
        (state: RootState) => state.properties.likedProperties
    ],
    (propertiesList, likedProperties) =>
        propertiesList.filter(property => likedProperties.includes(property.id))
);

// select Property By Id
export const selectPropertyById = (propertyId: Property['id']) => (state: RootState) => state.properties.propertiesList.find(property => property.id === propertyId);

// select Is Property Liked
export const selectIsPropertyLiked = (propertyId: Property['id']) => (state: RootState) => state.properties.likedProperties.includes(propertyId);



