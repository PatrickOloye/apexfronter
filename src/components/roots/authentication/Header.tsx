import Link from 'next/link';
import { BrandMark } from '@/components/BrandMark';

export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="container mx-auto flex items-center">
        <Link href="/" className="flex items-center">
          <BrandMark variant="light" size="md" />
        </Link>
      </div>
    </header>
  );
}