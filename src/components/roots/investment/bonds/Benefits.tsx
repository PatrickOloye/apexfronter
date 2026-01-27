
import {  Shield, TrendingUp, DollarSign, BarChart2 } from 'lucide-react';
// This component displays the benefits of the investment account in a grid layout
export const InvestmentBenefitsGrid = ({
    title = "Benefits of Investing with Apex Finance",
    description = "Discover why our investment solutions stand out from traditional options",
    benefits = [
      {
        title: "Stable Income Stream",
        description: "Bonds typically pay interest semi-annually, giving you a reliable source of income.",
        icon: <TrendingUp className="h-8 w-8" />,
      },
      {
        title: "Capital Preservation",
        description: "Most bonds return your principal at maturity, protecting your initial investment.",
        icon: <Shield className="h-8 w-8" />,
      },
      {
        title: "Portfolio Diversification",
        description: "Adding bonds to your portfolio helps reduce overall volatility when paired with equities.",
        icon: <BarChart2 className="h-8 w-8" />,
      },
      {
        title: "Risk Control",
        description: "Choose from bonds with different credit ratings and maturities to match your risk profile.",
        icon: <Shield className="h-8 w-8" />,
      },
      {
        title: "Tax Efficiency",
        description: "Certain bonds, like municipal bonds, offer tax-free income — boosting your after-tax returns.",
        icon: <DollarSign className="h-8 w-8" />,
      },
      {
        title: "No Brokerage Fees",
        description: "Buy and sell bonds instantly without paying hidden fees or commissions.",
        icon: <DollarSign className="h-8 w-8" />,
      },
    ],
    color = "blue-600"
  }) => {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-${color}`}>{title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 transition-transform hover:-translate-y-1">
                <div className={`inline-flex items-center justify-center p-3 bg-${color}/10 rounded-lg mb-4 text-${color}`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };