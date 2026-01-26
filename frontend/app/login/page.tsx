'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Check if user is already logged in
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
    }

    fetchUser()

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

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

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSent(false)
    setEmail('')
  }

  // Derive username from email if available
  const getUserName = () => {
    if (!user) return ''
    if (user.user_metadata?.first_name) return user.user_metadata.first_name
    if (user.email) return user.email.split('@')[0]
    if (user.phone) return user.phone
    return 'User'
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border p-6 shadow-md">
        {!user ? (
          <>
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
                  disabled={loading || !email}
                  className="w-full rounded bg-black py-2 text-white disabled:opacity-50"
                >
                  {loading ? 'Sending…' : 'Send Magic Link'}
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="mb-4 text-xl font-bold">Welcome, {getUserName()}!</h1>
            <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
              You are logged in successfully.
            </p>
            <button
              onClick={signOut}
              className="w-full rounded border border-gray-800 dark:border-gray-100 py-2 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  )
}

