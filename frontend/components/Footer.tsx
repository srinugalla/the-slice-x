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
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Logo & About */}
        <div className="flex flex-col gap-3 items-start">
          <Image
            src="/logo.png"
            alt="SliceX"
            width={140}
            height={48}
            className="h-12 md:h-14 w-auto transition-transform duration-300 hover:scale-110 filter drop-shadow-md hover:drop-shadow-lg"
          />
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xs">
            India's largest verified land marketplace. Explore premium land listings with ease and confidence.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Explore</h4>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-semibold hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Connect</h4>

          {/* Contact Info */}
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Email: <a href="mailto:info@slicex.com" className="font-semibold hover:text-orange-500 dark:hover:text-orange-400 transition-colors">info@slicex.com</a>
          </p>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Phone: <a href="tel:+911234567890" className="font-semibold hover:text-orange-500 dark:hover:text-orange-400 transition-colors">+91 12345 67890</a>
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition transform hover:scale-125"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Copyright */}
      <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-semibold tracking-wide">
          © {new Date().getFullYear()} SliceX. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
