// components/ShopCards.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BadgeCheck,
  RefreshCw,
  ShieldCheck,
  Truck,
  Star,
  Heart,
} from 'lucide-react';

import { client } from '../../lib/client';    // Next‑sanity client
import Footer from '../Footer';
import ShopItems from './ShopItems';

export default function ShopCards({ isDarkMode }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [shopItems, setShopItems] = useState([]);
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
    router.push(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  const toggleFavorite = (id) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

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
  if (error)
    return (
      <p className="text-red-500">
        Error loading shop items from our side, please reload.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Hero Text */}
      <div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Get Inspired</h1>
        <p className="text-lg">
          Whether you're looking for innovative medical devices or everyday
          health solutions, our shop offers quality, convenience, and care in
          every product.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {[
          {
            title: 'Certified',
            icon: BadgeCheck,
            content: 'Available certificates of authenticity',
          },
          {
            title: 'Secure',
            icon: ShieldCheck,
            content: 'Certified marketplace since 2024',
          },
          {
            title: 'Shipping',
            icon: Truck,
            content: 'Free, fast, and reliable worldwide',
          },
          {
            title: 'Transparent',
            icon: RefreshCw,
            content: 'Hassle-free return policy',
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center border bg-gradient-700 rounded-lg p-4 text-center"
          >
            <feature.icon className="text-purple-500 w-8 h-8 mb-2" />
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.content}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex flex-wrap items-center justify-between mt-10 mb-6 gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-auto flex-1 border border-gray-700 bg-inherit rounded-3xl px-4 py-2 placeholder-gray-400"
        />
      </div>

      {/* Items */}
      <h2 className="text-2xl font-bold mb-4 border-b-2 pt-2 pb-1 border-purple-800 w-fit">Available Items</h2>
      <ShopItems limit={undefined} horizontal={false} />

      <Footer />
    </div>
  );
}
