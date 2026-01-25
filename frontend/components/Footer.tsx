import Link from 'next/link'
import Image from 'next/image'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export default function Footer() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Map", href: "/map" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & About */}
        <div className="flex flex-col gap-3 items-start">
          <Image
            src="/logo.png"
            alt="SliceX"
            width={40}
            height={40}
            className="object-contain"
          />
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Trusted land marketplace — find your dream property easily and securely.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold mb-2">Explore</h4>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold mb-2">Connect</h4>

          {/* Contact Info */}
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Email: <a href="mailto:info@slicex.com" className="font-bold hover:text-blue-600 dark:hover:text-blue-400">info@slicex.com</a>
          </p>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Phone: <a href="tel:+911234567890" className="font-bold hover:text-blue-600 dark:hover:text-blue-400">+91 12345 67890</a>
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition transform hover:scale-125" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition transform hover:scale-125" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition transform hover:scale-125" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition transform hover:scale-125" />
            </a>
          </div>
        </div>
      </div>

      {/* Premium Copyright */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-semibold tracking-wide">
          © {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
