'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { supabase } from "@/lib/supabaseClient"

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Map", href: "/map" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
    }

    fetchUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const getUserName = () => {
    if (!user) return ''
    if (user.user_metadata?.first_name) return user.user_metadata.first_name
    if (user.email) return user.email.split('@')[0]
    if (user.phone) return user.phone
    return 'User'
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
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

          {/* Login / User */}
          {user ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                {getUserName().charAt(0).toUpperCase()}
              </div>
              <span className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {getUserName()}
              </span>
              {/* Sign Out dropdown */}
              <div className="absolute top-10 right-0 hidden group-hover:flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md min-w-[120px]">
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-left text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Burger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-800 dark:text-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${
                  pathname === item.href ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                    {getUserName().charAt(0).toUpperCase()}
                  </div>
                  <span>{getUserName()}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full rounded border border-gray-800 dark:border-gray-100 py-2 mt-2 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
