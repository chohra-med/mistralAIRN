/* This contains the Types of Data that we have in Our API */

export interface Property {
  /* Unique identifier for the property */
  id: string;
  /* Title or name of the property */
  title: string;
  /* Description of the property */
  description: string;
  /* Address of the property */
  address: string;
  /* Price of the property */
  price: number;
  /* Number of bedrooms in the property */
  bedrooms: number;
  /* Number of bathrooms in the property */
  bathrooms: number;
  /* Size of the property in square feet */
  size: number;
  /* URL of the property's image */
  imageUrl: string;
  /* Status of the property listing */
  status: 'available' | 'sold' | 'pending';
}

