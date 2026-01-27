import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="container mx-auto flex items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/logo.png" 
            alt="Company Logo" 
            width={48} 
            height={48}
            className="mr-2"
          />
          <div className="flex flex-col">
            <span className="text-green-600 text-xs">APEX</span>
            <span className="text-gray-900 font-bold text-xl">APEX</span>
          </div>
        </Link>
      </div>
    </header>
  );
}