import { client } from "@/sanity/lib/client";
import { fullProduct, simpleLifiedProduct } from "../interface";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
async function getData(category: string) {
  const query = `*[_type == "product" && category->name == $category][0...4] | order(_createdAt desc) {
    _id,
    price,
    name,
    "slug":slug.current,
    "categoryName":category->name,
    "imageUrl": images[0].asset->url
    }

`;
  const data = await client.fetch(query, { category });
  return data;
}
export const dynamic = "force-dynamic";
export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const data: simpleLifiedProduct[] = await getData(params.category);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:py-6  lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products for {params.category}
          </h2>
          <Link className="text-primary flex items-center gap-x-1" href="/all">
            See All
            <ArrowRight />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                  priority
                />
              </div>
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500">{product.categoryName}</p>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ${product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
