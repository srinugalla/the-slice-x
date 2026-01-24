import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="The Slice X"
            width={150}
            height={50}
            className="block"
          />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex gap-8 text-gray-700 dark:text-gray-200 font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Auth links */}
        <div className="hidden md:flex gap-4">
          <Link
            href="/signin"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          {/* You can add a mobile menu icon here if needed */}
        </div>
      </div>
    </header>
  )
}
