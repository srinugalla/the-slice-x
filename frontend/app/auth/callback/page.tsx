'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Auth callback error:', error)
      }

      if (data.session) {
        // 🔐 Session is now persisted
        router.replace('/')
      } else {
        // fallback
        router.replace('/login')
      }
    }

    handleAuth()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-gray-600">
      Finalizing secure sign-in…
    </div>
  )
}
