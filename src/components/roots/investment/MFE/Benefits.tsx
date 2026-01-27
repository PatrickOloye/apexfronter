
// src/components/investment/BenefitsSection.tsx
import React from 'react';
import { Check, Shield, TrendingUp, Users, Clock, BarChart } from 'lucide-react';

type Benefit = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type BenefitsSectionProps = {
  title: string;
  subtitle: string;
  benefits: Benefit[];
  colorClass?: string;
};

const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  title,
  subtitle,
  benefits,
  colorClass = 'blue-600',
}) => {
  const icons = {
    check: <Check className={`h-8 w-8 text-${colorClass}`} />,
    shield: <Shield className={`h-8 w-8 text-${colorClass}`} />,
    trendingUp: <TrendingUp className={`h-8 w-8 text-${colorClass}`} />,
    users: <Users className={`h-8 w-8 text-${colorClass}`} />,
    clock: <Clock className={`h-8 w-8 text-${colorClass}`} />,
    chart: <BarChart className={`h-8 w-8 text-${colorClass}`} />,
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 text-${colorClass}`}>{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default BenefitsSection;
