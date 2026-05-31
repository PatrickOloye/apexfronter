import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface InsightItem {
  id: string;
  category: string;
  title: string;
  contentType: 'Podcast' | 'Video' | 'Article';
  date: string;
  imageUrl: string;
  duration?: string;
  featured?: boolean;
}

const insights: InsightItem[] = [
  {
    id: '1',
    category: 'APEX BANKING INSIGHTS',
    title: 'The future of digital banking in emerging markets',
    contentType: 'Article',
    date: 'May 10, 2025',
    imageUrl: '/landing-page/banking-insight1.jpg',
    featured: true
  },
  {
    id: '2',
    category: 'APEX BANKING TALKS',
    title: 'CEO Sarah Nguyen on sustainable banking practices',
    contentType: 'Video',
    date: 'May 5, 2025',
    imageUrl: '/landing-page/banking-insight2.jpg',
    duration: '22:15'
  },
  {
    id: '3',
    category: 'MARKET TRENDS',
    title: 'How AI is transforming financial services',
    contentType: 'Podcast',
    date: 'May 3, 2025',
    imageUrl: '/landing-page/banking-insight3.jpg'
  },
  {
    id: '4',
    category: 'FINANCIAL STRATEGY',
    title: 'Building wealth in volatile economic times',
    contentType: 'Article',
    date: 'Apr 28, 2025',
    imageUrl: '/landing-page/banking-insight4.jpg'
  }
];

const PlayIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const AudioIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

export default function FinancialInsights() {
  const featuredInsight = insights.find(item => item.featured);
  const sideInsights = insights.filter(item => !item.featured);

  return (
    <div className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-8">
      <div className="mb-6">
        <h5 className="text-sm font-medium text-blue-600">OUR INSIGHTS</h5>
        <h1 className="mb-2 break-words text-4xl font-bold text-gray-800">Financial Market Trends and Economic Analysis</h1>
        <Link href="/" className="text-sm text-blue-600 underline hover:no-underline">
          View All Insights
        </Link>
        <div className="border-b border-gray-200 mt-4"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Featured insight - left side */}
        {featuredInsight && (
          <div className="flex min-w-0 flex-col">
            <div className="relative h-64 w-full mb-4">
              <Image
                src="/landing-page/coin1.jpg"
                // src={featuredInsight.imageUrl}
                alt={featuredInsight.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="mt-2">
              <div className="text-sm font-medium text-gray-600">{featuredInsight.category}</div>
              <h2 className="mt-1 mb-2 break-words text-2xl font-bold">{featuredInsight.title}</h2>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
                {featuredInsight.contentType === 'Podcast' ? <AudioIcon /> : 
                 featuredInsight.contentType === 'Video' ? <PlayIcon /> : null}
                <span>{featuredInsight.contentType}</span>
                <span>|</span>
                <span>{featuredInsight.date}</span>
              </div>
            </div>
          </div>
        )}

        {/* Right side insights */}
        <div className="flex flex-col space-y-6">
          {sideInsights.map((insight) => (
            <div key={insight.id} className="flex min-w-0 items-start gap-4">
              <div className="relative h-24 w-32 flex-shrink-0">
                <Image
                  // src={insight.imageUrl}
                  src="/landing-page/coin1.jpg"
                  alt={insight.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                {insight.contentType === 'Video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-black bg-opacity-60 rounded-full flex items-center justify-center text-white">
                      <PlayIcon />
                    </div>
                    {insight.duration && (
                      <span className="absolute bottom-1 right-1 text-xs text-white bg-black bg-opacity-50 px-1 rounded">
                        {insight.duration}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-600">{insight.category}</div>
                <h3 className="mb-1 break-words font-bold">{insight.title}</h3>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
                  {insight.contentType === 'Podcast' ? <AudioIcon /> : 
                   insight.contentType === 'Video' ? <PlayIcon /> : null}
                  <span>{insight.contentType}</span>
                  <span>|</span>
                  <span>{insight.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
