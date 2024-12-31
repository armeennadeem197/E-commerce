import { type SchemaTypeDefinition } from 'sanity';
import products from './products';
import category from './category';
import heroImages from './heroImages';
// Defining the schema with all types
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, category, heroImages],
};
