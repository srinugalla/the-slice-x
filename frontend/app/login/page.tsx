'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginModal() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Fetch existing session on load
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
    }

    fetchUser()

    // Listen for auth state changes (magic link return, signout, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

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
    setEmail('')
    setSent(false)
  }

  // Username derivation (future-proof)
  const getUserName = () => {
    if (!user) return ''
    if (user.user_metadata?.first_name) return user.user_metadata.first_name
    if (user.email) return user.email.split('@')[0]
    if (user.phone) return user.phone
    return 'User'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl border border-gray-200 dark:border-gray-800">
        {!user ? (
          <>
            <h1 className="text-lg font-bold mb-1">
              Sign in to SliceX
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
              Access your saved properties and preferences
            </p>

            {sent ? (
              <div className="rounded-lg bg-green-50 dark:bg-green-900/30 p-3 text-sm text-green-700 dark:text-green-300">
                Magic link sent. Please check your email.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-4 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <button
                  onClick={sendMagicLink}
                  disabled={loading || !email}
                  className="w-full rounded-lg bg-orange-500 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition disabled:opacity-50"
                >
                  {loading ? 'Sending…' : 'Send Magic Link'}
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="text-lg font-bold mb-1">
              Welcome, {getUserName()} 👋
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
              You’re signed in successfully.
            </p>

            <button
              onClick={signOut}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 py-2.5 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  )
}
