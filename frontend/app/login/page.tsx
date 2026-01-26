'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const sendMagicLink = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL,
      },
    })

    if (error) {
      alert(error.message)
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border p-6">
        <h1 className="mb-4 text-xl font-bold">Login to The Slice X</h1>

        {sent ? (
          <p className="text-sm text-green-600">
            Magic link sent. Check your email.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 w-full rounded border px-3 py-2"
            />

            <button
              onClick={sendMagicLink}
              disabled={loading}
              className="w-full rounded bg-black py-2 text-white disabled:opacity-50"
            >
              {loading ? 'Sending…' : 'Send Magic Link'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
