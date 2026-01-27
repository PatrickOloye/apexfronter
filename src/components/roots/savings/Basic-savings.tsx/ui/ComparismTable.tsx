interface ComparisonTableProps {
  accountType: string;
  comparisons: {
    feature: string;
    currentAccount: string;
    basic: string;
    premium: string;
  }[];
}

const ComparisonTable = ({ accountType, comparisons }: ComparisonTableProps) => {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
            How {accountType} Compares
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden shadow-md">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-left">{accountType}</th>
                  <th className="p-4 text-left">Basic Savings</th>
                  <th className="p-4 text-left">Premium Savings</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
                  >
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4">{row.currentAccount}</td>
                    <td className="p-4">{row.basic}</td>
                    <td className="p-4">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  };

  export default ComparisonTable;