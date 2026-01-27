'use client';

const HowItWorks = () => {
  const steps = [
    {
      title: "Open Your Account",
      description: "Complete our 5-minute online application with just your basic information and government ID.",
      icon: "📝"
    },
    {
      title: "Make Your First Deposit",
      description: "Start with as little as $25 through bank transfer, mobile check deposit, or in-person at our branches.",
      icon: "💳"
    },
    {
      title: "Watch Your Money Grow",
      description: "Earn interest daily, compounded monthly. Set up automatic transfers to build savings effortlessly.",
      icon: "📈"
    },
    {
      title: "Access When Needed",
      description: "Make up to 6 withdrawals per month with no fees. Get check-writing privileges and debit card access.",
      icon: "🏧"
    }
  ];

  return (
    <section className="py-16  bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">How Our Savings Accounts Work</h2>
        <p className="text-xl text-white mb-12 text-center max-w-3xl mx-auto">
          Getting started takes just minutes, and you&apos;ll begin earning interest immediately
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-4 ">{step.icon}</div>
              <div className="text-blue-800 font-medium mb-1">Step {index + 1}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-blue-100">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-white">Pro Tip: Maximize Your Savings</h3>
          <p className="text-blue-100 mb-4">
            Set up automatic transfers from your checking account each payday. Even $50 per paycheck adds up to $1,300 
            annually - plus interest! Our &apos;Round-Up&apos; feature can automatically invest your spare change from debit purchases.
          </p>
          <button className="bg-blue-600 text-white hover:bg-blue-700 font-medium py-2 px-6 rounded-lg transition-colors">
            Learn Savings Strategies
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;