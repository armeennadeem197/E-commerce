import { JSX } from "react";

export interface simpleLifiedProduct {
    map(arg0: (product: any) => JSX.Element): import("react").ReactNode | Iterable<import("react").ReactNode>;
    _id:string;
    imageUrl:string;
    price:number;
    slug:string;
    categoryName:string;
    name:string;
    description:string;
}

interface Image {
    asset: {
      url: string;
    };
  }
  
  // Define fullProduct interface (if not already defined)
  export interface fullProduct {
    imageUrl: string ;
    _id: string;

    name: string;
  
    description: string;
  
    price: number;
  
    categoryName: string;
  
    slug: {
  
      current: string;
  
    };
  
    images: {
  
      asset: {
  
        _id: string;
  
        url: string;
  
      };
  
    }[];
    price_id:string;
  }
  
  
  