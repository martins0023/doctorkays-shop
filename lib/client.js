// lib/sanity.js
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // exposed to the browser
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-06',
  useCdn: process.env.NODE_ENV === 'production',           // CDN in prod
  token: process.env.NEXT_PUBLIC_SANITY_SANITY_TOKEN,                     // server‑only
  ignoreBrowserTokenWarning: true,                         // supresses warning
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) =>
  source?.asset?._ref
    ? builder.image(source).url()
    : '' // fallback for missing images
