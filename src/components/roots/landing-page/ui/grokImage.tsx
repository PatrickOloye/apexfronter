import Image from 'next/image';

export default function Banner() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-white">
      <section className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-12 md:py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="w-full md:w-1/2 text-left space-y-6 z-10 md:pr-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Get expert financial guidance
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-lg">
            Our financial advisors can help you make the right decisions for your future
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Schedule Consultation
          </button>
        </div>

        <div className="w-full md:w-1/2 mt-10 md:mt-0 relative">
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px]">
            <Image
              src="/landing-page/financial-advisor.jpg"
              alt="Financial advisor meeting with clients"
              fill
              priority
              className="object-cover rounded-lg shadow-lg transform md:translate-x-4 transition-transform duration-500 hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full -z-10 hidden md:block"></div>
          </div>
        </div>
        
        <div className="absolute top-1/4 left-0 w-24 h-24 bg-blue-100 rounded-full opacity-70 -z-10 hidden lg:block"></div>
        <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-50 -z-10 hidden lg:block"></div>
      </section>
    </div>
  );
}