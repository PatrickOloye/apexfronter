
// 5. TESTIMONIALS SECTION COMPONENT
// This component displays customer testimonials about loan experiences

interface TestimonialProps {
    quote: string;
    author: string;
    role: string;
    image: string;
  }
  
import Image from 'next/image';

// ...
  const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, image }) => (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Image 
            className="h-10 w-10 rounded-full" 
            src={image} 
            alt={author}
            width={40}
            height={40}
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
  
  interface TestimonialsProps {
    backgroundColor?: string;
    accentColor?: string;
  }
  
  export const Testimonials: React.FC<TestimonialsProps> = ({
    backgroundColor = "bg-gray-100",
    accentColor = "blue-600"
  }) => {
    const testimonials = [
      {
        quote: "The unsecured loan from Apex Finance helped me consolidate five credit card bills into one manageable payment. I'm saving over $300 each month in interest!",
        author: "Sarah Johnson",
        role: "Home Owner",
        image: "/testimonials/person1.jpg"
      },
      {
        quote: "I needed to cover unexpected medical expenses quickly. Apex Finance's application process was seamless, and the funds were in my account the next day.",
        author: "Michael Chen",
        role: "Small Business Owner",
        image: "/testimonials/person2.jpg"
      },
      {
        quote: "Thanks to my unsecured loan, I was able to renovate my kitchen without tapping into my home equity. The fixed rate makes budgeting so much easier.",
        author: "Priya Patel",
        role: "Marketing Professional",
        image: "/testimonials/person3.jpg"
      }
    ];
    
    return (
      <div className={`${backgroundColor} py-12 px-4 rounded-xl`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real stories from real people who transformed their finances with our unsecured personal loans.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                image={testimonial.image}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <a 
              href="#" 
              className={`inline-flex items-center text-${accentColor} font-medium hover:underline`}
            >
              Read more success stories
              <svg 
                className="ml-2 w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  };