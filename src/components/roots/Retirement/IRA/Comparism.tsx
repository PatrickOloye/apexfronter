
// 3. Comparison Table Component - Reusable for different account types
interface ComparisonItem {
    feature: string;
    optionA: React.ReactNode;
    optionB: React.ReactNode;
  }
  
  interface ComparisonTableProps {
    title: string;
    description: string;
    optionAName: string;
    optionBName: string;
    items: ComparisonItem[];
    colorTheme?: 'blue' | 'green' | 'purple';
  }
  
  export const ComparisonTable: React.FC<ComparisonTableProps> = ({
    title,
    description,
    optionAName,
    optionBName,
    items,
    colorTheme = 'blue'
  }) => {
    const headerBgClasses = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
    };
    
    const stripedRowClasses = {
      blue: 'bg-blue-50',
      green: 'bg-green-50',
      purple: 'bg-purple-50',
    };
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="bg-gray-100 px-6 py-4 text-left text-gray-700 font-medium">Feature</th>
                  <th className={`${headerBgClasses[colorTheme]} px-6 py-4 text-left text-white font-medium`}>{optionAName}</th>
                  <th className={`${headerBgClasses[colorTheme]} px-6 py-4 text-left text-white font-medium`}>{optionBName}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className={index % 2 === 1 ? stripedRowClasses[colorTheme] : 'bg-white'}>
                    <td className="border-t px-6 py-4 font-medium">{item.feature}</td>
                    <td className="border-t px-6 py-4">{item.optionA}</td>
                    <td className="border-t px-6 py-4">{item.optionB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  };
  