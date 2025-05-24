// components/WorkflowSection.jsx
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

import { checklistItems } from '../constants'

export default function WorkflowSection() {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Why Should You{' '}
        <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
          Trust Us?
        </span>
      </h2>

      <div className="flex flex-wrap justify-center items-center">
        {/* Image Column */}
        <div className="p-2 w-full lg:w-1/2 h-fit">
          <div className="mt-5 rounded-lg overflow-hidden">
            <Image
              src="/assets/019.jpg"
              alt="Doctor kays"
              layout="responsive"
              objectFit="cover"
              width={1200}
              height={800}
              priority
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Checklist Column */}
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="flex mb-12">
              <div className="flex items-center justify-center mx-6 bg-neutral-900 h-10 w-10 p-2 rounded-full text-purple-400">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl font-semibold">
                  {item.title}
                </h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
