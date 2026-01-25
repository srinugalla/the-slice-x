'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Map", href: "/map" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Register", href: "/register" },
    { name: "Signin", href: "/signin" },
  ]

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

        {/* Navigation */}
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
        </nav>
      </div>
    </header>
  )
}
