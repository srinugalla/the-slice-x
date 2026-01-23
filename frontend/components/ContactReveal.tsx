'use client'

import { useState } from 'react'

interface ContactRevealProps {
  landId: string
  ownerNumber?: string
}

export default function ContactReveal({ landId, ownerNumber }: ContactRevealProps) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Reveal Contact
        </button>
      ) : (
        <p className="text-gray-700">
          {ownerNumber ? ownerNumber : `Owner contact for Land ID: ${landId}`}
        </p>
      )}
    </div>
  )
}
