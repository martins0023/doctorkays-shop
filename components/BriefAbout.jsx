// components/BriefAbout.jsx
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { checkaboutlists } from '../constants'
import {
  bouncex,
  fadeIn,
  pulse,
  slideInFromLeft,
  slideInFromTop,
  staggerContainer,
} from '../constants/animations'
import Button from './Button'

export default function BriefAbout() {
  const router = useRouter()

  const handleAbout = () => {
    router.push('/about')
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="mt-20"
    >
      <div className="flex flex-wrap justify-center">
        {/* Left column */}
        <div className="p-2 w-full lg:w-1/2">
          <div className="flex flex-col gap-2">
            <motion.div variants={slideInFromTop} className="relative w-full h-64 lg:h-96">
              <Image
                src="/assets/011.jpg"
                alt="Doctor Olayiwola"
                layout="fill"
                objectFit="cover"
                className="rounded-xl h-fit object-contain"
                priority
              />
            </motion.div>

            <motion.p
              variants={slideInFromLeft}
              className="text-base text-neutral-500"
            >
              Doctor Olayiwola is not your run‑of‑the‑mill medical doctor. He
              is a tech lover, family advocate and firm believer in preventive
              and community medicine. His passion lies in promoting health
              awareness through engaging, relatable content that combines
              storytelling and humor.
            </motion.p>

            <div className="flex justify-center mt-2">
              <Button
                onClick={handleAbout}
                img={<ArrowRight />}
                text="Read More"
                variants={pulse}
                className="bg-gradient-to-l from-purple-700 to-red-400 w-fit"
              />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="pt-12 w-full lg:w-1/2">
          {checkaboutlists.map((item, index) => (
            <div key={index} className="flex mb-12">
              <motion.div
                variants={bouncex}
                className="flex items-center justify-center mx-6 bg-neutral-900 h-10 w-10 p-2 rounded-full text-purple-400"
              >
                {item.icon}
              </motion.div>
              <div>
                <h5 className="mt-1 mb-2 text-xl font-semibold">
                  {item.title}
                </h5>
                <p className="text-md text-neutral-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
