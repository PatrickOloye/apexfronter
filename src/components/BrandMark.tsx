import Image from 'next/image';
import { BRAND } from '@/config/brand';

interface BrandMarkProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { logo: 'w-6 h-6', text: 'text-base' },
  md: { logo: 'w-8 h-8', text: 'text-2xl' },
  lg: { logo: 'w-10 h-10', text: 'text-3xl' },
};

export function BrandMark({
  variant = 'dark',
  size = 'md',
  className = '',
}: BrandMarkProps) {
  const nameParts = BRAND.name.split(' ');
  const first = nameParts[0] || BRAND.name;
  const rest = nameParts.slice(1).join(' ');
  const baseText = variant === 'dark' ? 'text-white' : 'text-slate-900';
  const accentText = variant === 'dark' ? 'text-blue-500' : 'text-blue-600';
  const accentFill = variant === 'dark' ? 'fill-blue-500' : 'fill-blue-600';
  const sizeCfg = sizeMap[size];

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`relative ${sizeCfg.logo}`}>
        <Image
          src={BRAND.logoSrc}
          alt={`${BRAND.name} Logo`}
          fill
          sizes={size === 'sm' ? '24px' : size === 'lg' ? '40px' : '32px'}
          className="object-contain"
        />
      </span>
      <span className="relative whitespace-nowrap">
        <svg
          aria-hidden="true"
          viewBox="0 0 418 42"
          className={`absolute top-2/3 left-0 h-[0.58em] w-full ${accentFill}`}
          preserveAspectRatio="none"
        >
          <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z" />
        </svg>
        <span className={`relative font-bold ${sizeCfg.text} ${baseText}`}>
          {first}{' '}
          {rest ? <span className={accentText}>{rest}</span> : null}
        </span>
      </span>
    </span>
  );
}
