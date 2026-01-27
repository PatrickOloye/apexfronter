
interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
  
  interface AccountFeaturesProps {
    heading: string;
    subheading: string;
    features: Feature[];
    colorTheme?: 'blue' | 'green' | 'purple';
  }
  
  export const AccountFeatures: React.FC<AccountFeaturesProps> = ({
    heading,
    subheading,
    features,
    colorTheme = 'blue'
  }) => {
    const textColorClasses = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
    };
  
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{subheading}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${textColorClasses[colorTheme]} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };