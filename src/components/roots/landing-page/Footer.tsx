import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-blue-600">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Bar with Logo and Language Selector */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-yellow-400 flex items-center justify-center">
              <Image src="/logo.png" alt="Bank Logo" width={40} height={40} />
            </div>
            <div className="ml-2">
              <select className="bg-white text-blue-900 p-2 w-32">
                <option>English</option>
                <option>Français</option>
                <option>العربية</option>
              </select>
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex gap-4">
            <Link href="#" aria-label="Facebook">
              <div className="bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
            <Link href="#" aria-label="Twitter">
              <div className="bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </div>
            </Link>
            <Link href="#" aria-label="Instagram">
              <div className="bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
            <Link href="#" aria-label="YouTube">
              <div className="bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <div className="bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Horizontal Line */}
        <div className="border-t border-blue-800 mb-8"></div>
        
        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Banking Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">BANKING</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-gray-300">Corporate Information</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Personal Banking</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Business Banking</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Private Banking</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Loan Calculator</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Vendor Portal</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Download Forms</Link></li>
              <li><Link href="#" className="hover:text-gray-300">USSD</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Update BVN/NIN</Link></li>
            </ul>
          </div>
          
          {/* Security Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">SECURITY</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-gray-300">SSN</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Anti-Fraud</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Security Tips</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Secure Code</Link></li>
            </ul>
          </div>
          
          {/* Contact Us Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">CONTACT US</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-gray-300">Feedback and Complaints</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Whistleblowing</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Find a Branch</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Contact Form</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Find an Agent</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Agent Network</Link></li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">LEGAL</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-gray-300">Sitemap</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Terms of Use</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Cookies Policy</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Communications Policy</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Information and Cybersecurity Policy</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Delete FirstMobile Profile</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar with Copyright */}
      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2025. First Bank of Nigeria Ltd. A FirstHoldCo Company. Licensed by the Central Bank of Nigeria</p>
          <Link href="#top" className="text-sm hover:text-gray-300 mt-2 md:mt-0">Back to Top</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;