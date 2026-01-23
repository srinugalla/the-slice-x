'use client'

import React, { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

// ✅ Define props interface
interface ContactRevealProps {
  landId: string
  ownerNumber?: string | null
}

// ✅ Explicitly type the component as React.FC
const ContactReveal: React.FC<ContactRevealProps> = ({ landId, ownerNumber }) => {
  const [revealed, setRevealed] = useState(false)

  if (!ownerNumber) return null

  return (
    <div className="mt-2 flex flex-col items-start">
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-200"
        >
          <FaWhatsapp /> Show Owner Number
        </button>
      ) : (
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-900 rounded border border-gray-300">
          <FaWhatsapp className="text-green-500" />
          <span>{ownerNumber}</span>
        </div>
      )}
      <small className="text-gray-400 text-xs mt-1">Land ID: {landId}</small>
    </div>
  )
}

export default ContactReveal
