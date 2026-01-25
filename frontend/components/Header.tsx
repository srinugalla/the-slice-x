'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiX, FiMap } from 'react-icons/fi'

export default function Header() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: 'Listings' },
    { href: '/map', label: 'Map', icon: <FiMap className="inline-block -mt-[2px]" /> },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="w-full bg-white dark:bg-gray-900/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 relative">
                {/* replace with your svg/png in public */}
                <Image src="/logo.png" alt="SliceX" fill className="object-contain" />
              </div>
              
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white flex items-center gap-2"
              >
                {l.icon && <span className="text-sky-600">{l.icon}</span>}
                {l.label}
              </Link>
            ))}

            {/* Sign in / Register placeholders */}
            <div className="ml-4 flex items-center gap-3">
              <Link href="/signin" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">Sign in</Link>
              <Link href="/register" className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">Register</Link>
            </div>
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-md"
              >
                <div className="flex items-center gap-2">
                  {l.icon && <span className="text-sky-600">{l.icon}</span>}
                  {l.label}
                </div>
              </Link>
            ))}

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <Link href="/signin" onClick={() => setOpen(false)} className="block text-base text-gray-600 dark:text-gray-300 py-2">Sign in</Link>
              <Link href="/register" onClick={() => setOpen(false)} className="block text-base bg-blue-600 text-white px-4 py-2 rounded-md mt-2">Register</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
