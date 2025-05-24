'use client'

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';

import Preloader from './Preloader';
import { client } from '../lib/client';           // updated path
import { slideInFromLeft, textVariants } from '../constants/animations';

export default function FaqCards({ limit }) {
  const [loading, setLoading] = useState(true)
  const [faqs, setFaqs] = useState([])
  const [error, setError] = useState(null)
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    async function fetchFaqs() {
      setLoading(true)
      try {
        const query = `*[_type == "faq"] | order(date desc){ _id, question, answer }`
        const data = await client.fetch(query)
        setFaqs(data)
      } catch (err) {
        console.error('Error fetching FAQs:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchFaqs()
  }, [])

  if (loading)
    return (
      <Preloader />
    )
  if (error) return <p className="text-red-500">Error: {error}</p>

  const displayed = typeof limit === 'number' ? faqs.slice(0, limit) : faqs

  return (
    <div>
      {displayed.map((faq, idx) => (
        <div key={faq._id} className="flex flex-col mt-5 mb-5">
          <div className="bg-gradient-to-r from-purple-800 to-purple-950 flex items-center justify-center w-[56px] h-[36px] rounded-md">
            <p className="text-white font-semibold text-[20px]">{idx + 1}</p>
          </div>
          <div className="flex flex-col mt-3">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <motion.p
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-2xl"
              >
                {faq.question}
              </motion.p>
              {openIndex === idx ? (
                <ChevronUp className="text-neutral-300 w-6 h-6" />
              ) : (
                <ChevronDown className="text-neutral-300 w-6 h-6" />
              )}
            </div>

            {openIndex === idx && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideInFromLeft}
                className="tracking-wide text-[16px] mt-3"
              >
                <PortableText value={faq.answer} />
              </motion.div>
            )}

            <hr className="border-neutral-800 w-full h-[1px] mt-3" />
          </div>
        </div>
      ))}
    </div>
  )
}

FaqCards.propTypes = {
  limit: PropTypes.number,
}
FaqCards.defaultProps = {
  limit: undefined,
}
