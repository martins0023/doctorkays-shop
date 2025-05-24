import React from 'react';
import ShopContext from "./ShopContext"

export const metadata = {
  title: "Our shop | Doctor Kays",
  description:
    "Buy medical equipments from our store.",
  openGraph: {
    title: "Shop | Doctor Kays",
    description: "Buy medical equipments from our store.",
    url: "/shop",
    siteName: "Doctor Kays",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy medical equipments from our store",
    description: "Shop with us.",
  },
};

export default function page () {
  return (
    <div>
      <ShopContext />
    </div>
  )
}