// components/ShopItems.jsx
'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';

import { client } from '../../lib/client'; // your Next.js–sanity client

export default function ShopItems({ limit, horizontal }) {
  const router = useRouter();
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchShopItems() {
      const query = `*[_type == "shop"]{
        _id,
        title,
        product,
        "imageUrl": icon[0].asset->url,
        "imageCount": count(icon),
        price,
        reviews,
        rating,
        "descriptionText": coalesce(description[0].children[0].text, "")
      }`;
      try {
        const data = await client.fetch(query);
        setShopItems(data);
      } catch (err) {
        console.error('Error fetching shop items:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchShopItems();
  }, []);

  const handleProductClick = (id) => {
    router.push(`/shop/${id}`);
    window.scrollTo(0, 0);
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500" />
      </div>
    );
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // apply limit if provided
  const displayed =
    typeof limit === 'number' ? shopItems.slice(0, limit) : shopItems;

  const containerClasses = horizontal
    ? 'flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2'
    : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';

  return (
    <div className={containerClasses}>
      {displayed.map((product) => (
        <div
          key={product._id}
          onClick={() => handleProductClick(product._id)}
          className="group relative bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 ease-in-out cursor-pointer hover:shadow-2xl hover:scale-105"
        >
          <div className="relative overflow-hidden rounded-xl bg-gray-100 h-48">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <button
            onClick={(e) => toggleFavorite(product._id, e)}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-purple-50 transition-colors"
          >
            <Heart
              className={`${
                favorites.includes(product._id)
                  ? 'text-purple-600 fill-current'
                  : 'text-gray-300'
              } w-5 h-5`}
            />
          </button>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
              {product.title}
            </h3>
            <p className="mt-1 text-gray-600 font-medium">${product.price}</p>
            <div className="flex items-center mt-2">
              {renderStars(product.rating)}
              <span className="ml-2 text-sm text-gray-500">
                {product.reviews}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
              {product.descriptionText}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

ShopItems.propTypes = {
  limit: PropTypes.number,
  horizontal: PropTypes.bool,
};

ShopItems.defaultProps = {
  limit: undefined,
  horizontal: false,
};