import Image from 'next/image';

interface DetailedExplanationProps {
  title: string;
  paragraphs: string[];
  images: [string, string]; // Tuple of two image URLs
}

const DetailedExplanation = ({ title, paragraphs, images }: DetailedExplanationProps) => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          {title}
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-16"> {/* Added mb-16 for bottom margin */}
          {/* Left-aligned text content */}
          <div className="lg:w-1/2">
            <div className="prose prose-lg text-white text-left">
              {paragraphs.map((para, index) => (
                <p key={index} className="mb-6">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Right side with overlapping images - adjusted positioning */}
          <div className="lg:w-1/2 relative w-full h-[380px] mt-8"> {/* Reduced height and added mt-8 */}
            {/* Base Image - moved up */}
            <div className="absolute right-0 top-4 w-[90%] h-[85%] rounded-xl overflow-hidden shadow-lg"> {/* Added top-4 */}
              <Image 
                src={images[0]} 
                alt="Savings account illustration" 
                fill
                className="object-cover"
              />
            </div>
            
            {/* Overlay Image - moved up */}
            <div className="absolute left-0 right-10 top-1/2 w-[85%] h-[80%] rounded-xl overflow-hidden shadow-lg z-10 border-white"> {/* Changed from bottom-0 to bottom-4 */}
              <Image 
                src={images[1]} 
                alt="Mobile banking screenshot" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* "Good to Know" section pushed down */}
        <div className="mt-20 bg-white p-8 rounded-xl border border-blue-100 max-w-4xl mx-auto"> {/* Changed from mt-12 to mt-20 */}
          <h3 className="text-xl font-bold text-blue-800 mb-4">
            Good to Know
          </h3>
          <p className="text-gray-700">
            Remember that savings accounts are designed for storing money you don&apos;t 
            need immediate access to. For frequent transactions, consider linking 
            to a checking account.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailedExplanation;