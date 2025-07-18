import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6 md:px-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">EventFlow</h3>
          <p className="text-sm">Your ultimate platform for discovering and managing events.</p>
          <div className="flex space-x-4">
            {/* Placeholder for social media icons */}
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Facebook
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-md font-semibold text-white">About</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/about" className="text-sm hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-white transition-colors">
                Our Team
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-white transition-colors">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-md font-semibold text-white">Support</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/contact" className="text-sm hover:text-white transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-sm hover:text-white transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-white transition-colors">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-md font-semibold text-white">Legal</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/privacy-policy" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} EventFlow. All rights reserved.
      </div>
    </footer>
  )
}
