'use client'

import { useState } from 'react'
import { FiPhone } from 'react-icons/fi'

interface ContactRevealProps {
  landId: string
  ownerNumber?: string
}

export default function ContactReveal({ landId, ownerNumber }: ContactRevealProps) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="mt-2">
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="
            flex items-center gap-2
            px-4 py-2 rounded-xl font-semibold
            bg-orange-500 text-white
            hover:bg-orange-600
            transition-all duration-200
            shadow-md hover:shadow-lg
          "
        >
          <FiPhone size={16} />
          Contact Owner
        </button>
      ) : (
        <div
          className="
            mt-2 px-4 py-3 rounded-xl
            text-center font-bold tracking-wide
            bg-orange-50 text-orange-700
            dark:bg-orange-500/10 dark:text-orange-400
            border border-orange-200 dark:border-orange-500/30
            shadow-sm
          "
        >
          📞 {ownerNumber ? ownerNumber : `Contact for Land ID: ${landId}`}
        </div>
      )}
    </div>
  )
}
