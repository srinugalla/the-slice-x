'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Slice X"
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-black">
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>

          <div className="ml-4 flex gap-4">
            <button className="text-sm">Sign in</button>
            <button className="px-4 py-2 rounded-full bg-black text-white text-sm">
              Register
            </button>
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-black"
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col px-6 py-4 gap-4 text-sm text-black">
            <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

            <hr />

            <Link href="/signin" onClick={() => setOpen(false)}>Sign in</Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="inline-flex justify-center rounded-full bg-black text-white py-2"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
