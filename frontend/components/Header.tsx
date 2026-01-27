'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { supabase } from '@/lib/supabaseClient'
import LoginModal from './LoginModal'

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showLogin, setShowLogin] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Map', href: '/map' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  // Fetch logged-in user and listen for changes
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
    }

    fetchUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setDropdownOpen(false)
  }

  const getUserName = () => {
    if (!user) return ''
    if (user.user_metadata?.first_name) return user.user_metadata.first_name
    if (user.email) return user.email.split('@')[0]
    if (user.phone) return user.phone
    return 'User'
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-gray-800 dark:text-gray-100">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                relative
                hover:text-orange-600 dark:hover:text-orange-400
                transition-colors duration-200
                ${pathname === item.href ? 'text-orange-600 dark:text-orange-400 font-bold' : ''}
              `}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-600 dark:bg-orange-400 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Auth / User */}
        <div className="hidden md:flex relative items-center">
          {user ? (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <span className="text-sm font-semibold">{getUserName()}</span>
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                  {getUserName().charAt(0).toUpperCase() || 'U'}
                </div>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 shadow-md rounded-md py-1 z-50">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Burger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-800 dark:text-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col px-6 py-4 gap-4 font-semibold text-gray-800 dark:text-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 ${
                  pathname === item.href ? 'text-orange-600 dark:text-orange-400 font-bold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth */}
            {user ? (
              <div className="flex flex-col mt-2">
                <span className="font-semibold mb-1">{getUserName()}</span>
                <button
                  onClick={() => {
                    handleSignOut()
                    setMobileOpen(false)
                  }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true)
                  setMobileOpen(false)
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition mt-2"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </header>
  )
}
