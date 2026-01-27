export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-white py-4 px-6 border-t border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Powered by <span className="font-medium">Peerless</span>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {currentYear} SeedBank Mizan. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }