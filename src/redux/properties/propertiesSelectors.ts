import { Property } from '~/api/types';
import { RootState, } from '../store';


// select All Properties
export const selectAllProperties = (state: RootState) => state.properties.propertiesList;
// select Liked Properties
export const selectLikedProperties = (state: RootState) => state.properties.propertiesList.filter(property => state.properties.likedProperties.includes(property.id));
// select Property By Id
export const selectPropertyById = (propertyId: Property['id']) => (state: RootState) => state.properties.propertiesList.find(property => property.id === propertyId);

export const selectIsPropertyLiked = (propertyId: Property['id']) => (state: RootState) => state.properties.likedProperties.includes(propertyId);



