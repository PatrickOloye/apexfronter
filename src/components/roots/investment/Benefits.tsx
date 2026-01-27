import { CheckCircle, TrendingUp, Clock, Lock, BarChart2, BookOpen } from 'lucide-react';

export default function AccountBenefitsGrid({ colorTheme = "blue-600" }) {
  const benefits = [
    {
      title: "Simplicity",
      description: "No need to switch between apps or wait for fund transfers. All your banking and investing in one place.",
      icon: <CheckCircle className="h-10 w-10" />,
    },
    {
      title: "Speed",
      description: "Execute trades instantly using your checking account balance with no waiting period.",
      icon: <Clock className="h-10 w-10" />,
    },
    {
      title: "Transparency",
      description: "View checking balance, transactions, and investment portfolio side-by-side for better financial clarity.",
      icon: <TrendingUp className="h-10 w-10" />,
    },
    {
      title: "Control",
      description: "Decide when and how much to invest — whether it's $10 or $10,000, with complete flexibility.",
      icon: <BarChart2 className="h-10 w-10" />,
    },
    {
      title: "Security",
      description: "Enterprise-grade protection with end-to-end encryption and multi-factor authentication.",
      icon: <Lock className="h-10 w-10" />,
    },
    {
      title: "Education",
      description: "Access free learning tools and market analysis to improve your investing knowledge.",
      icon: <BookOpen className="h-10 w-10" />,
    }
  ];

  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Benefits of Our Investment Checking Account
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how Apex Finance transforms your checking experience with integrated investment features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100"
            >
              <div className={`mb-5 text-${colorTheme}`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className={`px-8 py-3 bg-${colorTheme} text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow-md`}>
            Open Your Account Today
          </button>
        </div>
      </div>
    </div>
  );
}