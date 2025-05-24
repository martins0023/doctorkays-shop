'use client';
import React from 'react';

export default function Button({ text, img, primary, className = '', ...props }) {
  const base = 'px-6 py-2 rounded-lg border ';
  const style = primary
    ? 'bg-black text-white border-black'
    : 'border-gray-300';
  return (
    <button className={`${base} ${style} ${className}`} {...props}>
      <span className="flex items-center gap-2">
        {img}
        {text}
      </span>
    </button>
  );
}