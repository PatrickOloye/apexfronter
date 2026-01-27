
// 9. LOAN USE CASES COMPONENT
// This component shows different ways to use unsecured loans

import Image from 'next/image';

interface LoanUseCaseProps {
    icon: string;
    title: string;
    description: string;
    imageSrc: string;
    accentColor?: string;
  }
  
  const LoanUseCase: React.FC<LoanUseCaseProps> = ({ 
    icon, 
    title, 
    description, 
    imageSrc,
    accentColor = "blue-600" 
  }) => (
    <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-lg">
      <div className="lg:w-2/5 relative">
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={300}
          layout="responsive"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="lg:w-3/5 p-6 bg-white">
        <div className="flex items-center mb-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${accentColor} bg-opacity-10`}>
            <Image src={icon} alt="" width={20} height={20} className={`text-${accentColor}`} />
          </div>
          <h3 className="ml-3 text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
        <a 
          href="#" 
          className={`mt-4 inline-flex items-center font-medium text-${accentColor} hover:underline`}
        >
          Learn more
          <svg className="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
  
  interface LoanUseCasesProps {
    accentColor?: string;
    backgroundColor?: string;
  }
  
  export const LoanUseCases: React.FC<LoanUseCasesProps> = ({
    accentColor = "blue-600",
    backgroundColor = "bg-gray-50"
  }) => {
    const useCases = [
      {
        icon: "/icons/credit-card.svg",
        title: "Debt Consolidation",
        description: "Combine multiple high-interest debts into one manageable payment, potentially saving hundreds in interest and simplifying your monthly finances.",
        imageSrc: "/images/debt-consolidation.jpg"
      },
      {
        icon: "/icons/home.svg",
        title: "Home Improvements",
        description: "Transform your living space with renovations that increase your home's value and improve your quality of life, all without using your home as collateral.",
        imageSrc: "/images/home-improvement.jpg"
      },
      {
        icon: "/icons/medical.svg",
        title: "Medical Expenses",
        description: "Cover unexpected health costs, elective procedures, or ongoing treatments without draining your emergency savings or delaying necessary care.",
        imageSrc: "/images/medical.jpg"
      }
    ];
    
    return (
      <div className={`${backgroundColor} py-12 px-4 rounded-xl`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Ways to Use Your Unsecured Loan</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how an unsecured personal loan can help you achieve your financial goals.
            </p>
          </div>
          
          <div className="space-y-8">
            {useCases.map((useCase, index) => (
              <LoanUseCase
                key={index}
                icon={useCase.icon}
                title={useCase.title}
                description={useCase.description}
                imageSrc={useCase.imageSrc}
                accentColor={accentColor}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  