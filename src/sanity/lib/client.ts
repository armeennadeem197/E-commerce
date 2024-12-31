import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: "jfp89o36",
  dataset: "production", 
  apiVersion: "v2024-12-28",
  useCdn: true, 
});

const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}
