"use client";
import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckoutNow";

async function getProductBySlug(slug: string) {
  try {
    const res = await fetch(
      `https://jfp89o36.api.sanity.io/v2024-12-28/data/query/production?query=*%5B_type+%3D%3D+%22product%22+%26%26+slug.current+%3D%3D+%22${slug}%22%5D+%7B%0A++_id%2C%0A++name%2C%0A++description%2C%0A++price%2C%0A++%22categoryName%22%3A+category-%3Ename%2C%0A++slug+%7B%0A++++current%0A++%7D%2C%0A++images%5B%5D+%7B%0A++++asset-%3E%7B%0A++++++_id%2C%0A++++++url%0A++++%7D%0A++%7D%0A%7D%0A%0A`
    );
    if (!res.ok) throw new Error("Failed to fetch product data");
    const data = await res.json();
    return data.result[0];
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

type ProductPageProps = {
  params: { slug: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const [data, setData] = useState<fullProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      setLoading(true);
      setError(null);
      getProductBySlug(params.slug).then((product) => {
        if (product) {
          setData(product);
        } else {
          setError("Product not found");
        }
        setLoading(false);
      });
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div> {/* Consider adding a better spinner */}
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image Gallery */}
          <div className="flex justify-center">
            <ImageGallery images={data?.images || []} />
          </div>
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data?.categoryName || "Category not available"}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data?.name || "Product name not available"}
              </h2>
            </div>

            {/* Ratings */}
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${data?.price || "Price not available"}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${data ? data.price + 30 : "N/A"}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>

            {/* Shipping */}
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>
            <div className="flex gap-2.5 mb-0.5 mt-8">
              <AddToBag
                currency="USD"
                description={data?.description || "No description available"}
                image={data?.images[0]?.asset.url || ""}
                name={data?.name || "No name available"}
                price={data?.price ?? 0}
                key={data?._id}
                price_id={data?.price_id || ""}
              />
              <CheckoutNow
                currency="USD"
                description={data?.description || "No description available"}
                image={data?.images[0]?.asset.url || ""}
                name={data?.name || "No name available"}
                price={data?.price ?? 0}
                key={data?._id}
                price_id={data?.price_id || ""}
              />
            </div>
            {/* Description */}
            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data?.description || "Description not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
