import React from 'react';

interface AccountDetailsProps {
  eligibility: string[];
  benefits: string[];
  usageTips: string[];
}

const AccountDetailsSection: React.FC<AccountDetailsProps> = ({
  eligibility,
  benefits,
  usageTips
}) => {
  return (
    <section className="py-12 bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Eligibility */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Eligibility</h3>
            <ul className="space-y-2">
              {eligibility.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Key Benefits</h3>
            <ul className="space-y-2">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Usage Tips */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Smart Usage</h3>
            <ul className="space-y-2">
              {usageTips.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountDetailsSection;