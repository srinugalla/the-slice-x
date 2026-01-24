import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="font-bold text-lg mb-2">The Slice X</h3>
          <p className="text-sm">
            Trusted properties you can rely on — find your dream land easily and securely.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Explore</h4>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Connect</h4>
          <Link href="/contact">Contact Us</Link>
          <p className="text-sm mt-2">© {new Date().getFullYear()} The Slice X. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
