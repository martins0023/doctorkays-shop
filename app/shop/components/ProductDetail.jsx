// components/ProductDetail.jsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import EnquiryModal from '../../../components/Ecommerce/EnquiryModal';
import {
  BaggageClaim,
  ChevronLeft,
  MessageCircleQuestionIcon,
  ShoppingBag,
  ShoppingCart,
  Star,
  Store,
  TruckIcon,
} from 'lucide-react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import RichPortableText from '../../../components/portableTextComponents';
import axios from 'axios';

export default function ProductDetail({ product }) {
  const router = useRouter();
  const [mainImage, setMainImage] = useState(
    product.icon?.[0]?.asset.url || ''
  );
  const [thumbIndex, setThumbIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const images = product.icon.map(i => i.asset.url);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const goBack = () => router.back();

  const renderStars = rating => (
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  );

  const handleQuestionSubmit = async formData => {
    try {
      const res = await axios.post(
        `${API_BASE}/api/enquiry/post`, formData
      );
      setModalMessage("Thank you for your message. We've received your enquiry.");
      setSuccessOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Back button */}
      <button
        onClick={goBack}
        className="flex items-center text-gray-500 bg-inherit rounded-md text-xs p-3 mb-4"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="ml-2">Back to products</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Images */}
        <div>
          <div className="relative group">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h- rounded-lg transition-transform duration-300 group-hover:scale-100"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.title} thumb ${i + 1}`}
                className={`w-20 h-20 rounded-md object-cover cursor-pointer ${
                  i === thumbIndex ? 'ring-2 ring-purple-600' : ''
                }`}
                onMouseEnter={() => {
                  setMainImage(img);
                  setThumbIndex(i);
                }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <h2 className="text-lg font-semibold mt-3">Product Description</h2>
          <RichPortableText value={product.description} />

          <div className="flex items-center gap-1 mt-2">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
          </div>
          <p className="text-2xl font-semibold mt-3">${product.price}</p>

          <div className="flex items-center gap-4 mt-4">
            <Button className="bg-black text-white px-6 py-2 rounded-lg border" text="Buy Now" img={<ShoppingBag className="w-5 h-5" />} primary />
            <Button className="border px-6 py-2 rounded-lg" text="Add to Cart" img={<ShoppingCart className="w-5 h-5" />} />
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Delivery Options</h2>
            <ul className="text-sm text-gray-600 mt-2 flex flex-col gap-1">
              <li className="flex gap-2"><Store className="w-4 h-4" /> 100% Original Products</li>
              <li className="flex gap-2"><TruckIcon className="w-4 h-4" /> Pay on delivery might be available</li>
              <li className="flex gap-2"><BaggageClaim className="w-4 h-4" /> Easy 30 days returns</li>
            </ul>
          </div>

          <div className="mt-6">
            <label className="text-lg font-semibold block">Ask a question about this product</label>
            <Button text="Make Enquiries" img={<MessageCircleQuestionIcon className="w-5 h-5" />} onClick={() => setModalOpen(true)} primary className="bg-black text-white border px-6 py-2 rounded-lg mt-2"/>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <EnquiryModal onClose={() => setModalOpen(false)} onSubmit={handleQuestionSubmit} />
      )}
      <Modal isOpen={isSuccessOpen} onClose={() => setSuccessOpen(false)} message={modalMessage} />
    </>
  );
}
