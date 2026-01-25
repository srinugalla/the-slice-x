import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About */}
        <div className="space-y-3">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">SliceX</h3>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Trusted properties you can rely on — find your dream land easily and securely.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <h4 className="text-lg font-bold mb-2">Explore</h4>
          {[
            { name: 'Home', href: '/' },
            { name: 'Map', href: '/map' },
            { name: 'About', href: '/about' },
            { name: 'Blog', href: '/blog' },
            { name: 'Contact', href: '/contact' },
            { name: 'Register', href: '/register' },
            { name: 'Sign in', href: '/signin' },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
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
            Email: <a href="mailto:info@slicex.com" className="hover:text-blue-600 dark:hover:text-blue-400">info@slicex.com</a>
          </p>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Phone: <a href="tel:+911234567890" className="hover:text-blue-600 dark:hover:text-blue-400">+91 12345 67890</a>
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition transform hover:scale-110" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition transform hover:scale-110" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition transform hover:scale-110" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition transform hover:scale-110" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs md:text-sm mt-4 text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} SliceX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
