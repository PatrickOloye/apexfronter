
// CTASection.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CTAFeature {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  features?: CTAFeature[];
  imageSrc?: string;
  imageAlt?: string;
  colorScheme?: string;
  imagePosition?: 'left' | 'right';
}

export const CTASection = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  features,
  imageSrc,
  imageAlt = 'Feature illustration',
  colorScheme = 'blue-600',
  imagePosition = 'right'
}: CTASectionProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        {imagePosition === 'left' && imageSrc && (
          <div className="relative h-64 md:h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600 mb-8">{subtitle}</p>
          
          {features && features.length > 0 && (
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  {feature.icon ? (
                    <div className={`mt-1 text-${colorScheme}`}>{feature.icon}</div>
                  ) : (
                    <div className={`mt-1 text-${colorScheme}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href={primaryButtonUrl}
              className={`bg-${colorScheme} hover:bg-${colorScheme}/90 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors duration-300`}
            >
              {primaryButtonText}
            </Link>
            
            {secondaryButtonText && secondaryButtonUrl && (
              <Link 
                href={secondaryButtonUrl}
                className={`bg-white border border-${colorScheme} text-${colorScheme} font-bold py-3 px-6 rounded-lg text-center transition-colors duration-300 hover:bg-${colorScheme}/10`}
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
        
        {imagePosition === 'right' && imageSrc && (
          <div className="relative h-64 md:h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};
