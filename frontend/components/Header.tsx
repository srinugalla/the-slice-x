'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { supabase } from "@/lib/supabaseClient"

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Map", href: "/map" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const user = supabase.auth.user() // currently logged-in user

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLoginOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const sendMagicLink = async () => {
    if (!email) return
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL },
    })
    if (error) alert(error.message)
    else setSent(true)
    setLoading(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setLoginOpen(false)
    window.location.reload()
  }

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="SliceX"
            width={140}
            height={48}
            priority
            className="h-12 md:h-14 w-auto transition-transform duration-300 hover:scale-110 filter drop-shadow-md hover:drop-shadow-lg"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-gray-800 dark:text-gray-100">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                relative
                hover:text-blue-600 dark:hover:text-blue-400
                transition-colors duration-200
                ${pathname === item.href ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}
              `}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
              )}
            </Link>
          ))}

          {/* Login / User Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLoginOpen(!loginOpen)}
              className="ml-4 rounded bg-orange-500 hover:bg-orange-600 px-4 py-2 text-white font-semibold transition"
            >
              {user ? user.email.split('@')[0] : 'Login'}
            </button>

            {/* Dropdown Panel */}
            {loginOpen && !user && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50">
                {sent ? (
                  <p className="text-green-600 text-sm">Magic link sent! Check your email.</p>
                ) : (
                  <>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mb-3 w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={sendMagicLink}
                      disabled={loading}
                      className="w-full rounded bg-orange-500 hover:bg-orange-600 py-2 text-white font-semibold disabled:opacity-50"
                    >
                      {loading ? 'Sending…' : 'Send Magic Link'}
                    </button>
                  </>
                )}
              </div>
            )}

            {loginOpen && user && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 z-50 flex flex-col gap-2">
                <div className="text-gray-800 dark:text-gray-100 font-semibold">
                  {user.email.split('@')[0]}
                </div>
                <button
                  onClick={signOut}
                  className="w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900 px-2 py-1 rounded transition"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-800 dark:text-gray-100 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col px-6 py-4 gap-4 font-semibold text-gray-800 dark:text-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Login */}
            <button
              onClick={() => setLoginOpen(!loginOpen)}
              className="w-full rounded bg-orange-500 hover:bg-orange-600 py-2 text-white font-semibold transition"
            >
              {user ? user.email.split('@')[0] : 'Login'}
            </button>
            {loginOpen && !user && (
              <div className="mt-2 p-3 bg-white dark:bg-gray-800 border rounded shadow-lg flex flex-col gap-2">
                {sent ? (
                  <p className="text-green-600 text-sm">Magic link sent! Check your email.</p>
                ) : (
                  <>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mb-2 w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={sendMagicLink}
                      disabled={loading}
                      className="w-full rounded bg-orange-500 hover:bg-orange-600 py-2 text-white font-semibold disabled:opacity-50"
                    >
                      {loading ? 'Sending…' : 'Send Magic Link'}
                    </button>
                  </>
                )}
              </div>
            )}
            {loginOpen && user && (
              <div className="mt-2 p-2 bg-white dark:bg-gray-800 border rounded shadow-lg flex flex-col gap-2">
                <div className="text-gray-800 dark:text-gray-100 font-semibold">{user.email.split('@')[0]}</div>
                <button
                  onClick={signOut}
                  className="w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900 px-2 py-1 rounded transition"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
