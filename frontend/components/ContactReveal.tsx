'use client'

interface ContactRevealProps {
  landId: string
  ownerNumber?: string
}

export default function ContactReveal({ landId, ownerNumber }: ContactRevealProps) {
  return (
    <div>
      {/* Your existing contact reveal logic */}
      {ownerNumber ? <p>Owner: {ownerNumber}</p> : <p>Land ID: {landId}</p>}
    </div>
  )
}
