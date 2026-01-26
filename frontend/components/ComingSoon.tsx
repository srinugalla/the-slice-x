'use client'

import { motion } from 'framer-motion'

export default function ComingSoon({
  title = 'We’re cultivating something beautiful',
  subtitle = 'Just like great land, it takes time to grow. Please check back soon.',
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 text-center">
      <div className="max-w-xl">
        
        {/* Animated Seed → Plant */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl mb-6"
        >
          🌱
        </motion.div>

        {/* Floating animation */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        </motion.div>

        <p className="mt-4 text-gray-600 dark:text-gray-400 text-base md:text-lg">
          {subtitle}
        </p>

        {/* Subtle divider */}
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent" />
        </div>
      </div>
    </div>
  )
}
