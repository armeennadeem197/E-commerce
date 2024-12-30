"use client";
import Image from "next/image";
import { useState } from "react";

type ImageGalleryProps = {
  images: { asset: { url: string } }[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [bigImage, setBigImage] = useState(images[0].asset.url); // Set the first image as the big image

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Large Image */}
      <div className="w-full max-w-lg">
        <Image
          src={bigImage}
          alt="Big Product Image"
          width={600}
          height={600}
          className="object-cover rounded-lg"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4">
        {images.map((image, index) => (
          <div key={index} className="w-24 h-24 overflow-hidden rounded-md cursor-pointer">
            <Image
              src={image.asset.url}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="object-cover"
              onClick={() => setBigImage(image.asset.url)} // Change the big image when a thumbnail is clicked
            />
          </div>
        ))}
      </div>
    </div>
  );
}
