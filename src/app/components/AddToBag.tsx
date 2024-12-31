"use client";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/client";
import { useShoppingCart } from "use-shopping-cart";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  // Ensure image is valid and passed correctly
  const imageUrl = image?.asset ? urlFor(image).url() : "";

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: imageUrl,  // Use the correct image URL here
    price_id: price_id,
  };

  return (
    <Button
      onClick={() => {
        addItem(product);
        handleCartClick();
      }}
    >
      Add To Cart
    </Button>
  );
}
