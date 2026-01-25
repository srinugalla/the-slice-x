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
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold mb-2">Explore</h4>
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
          <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold mb-2">Connect</h4>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Us</Link>
          
          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <Icon
                key={idx}
                className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition transform hover:scale-110"
              />
            ))}
          </div>

          <p className="text-xs md:text-sm mt-4 text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} SliceX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
