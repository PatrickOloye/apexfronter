''

// Top navbar links (no dropdowns)
export const topNavLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Support', href: '/support' },
  { name: 'Careers', href: '/careers' },
  { name: 'News', href: '/news' }
];

// Bottom navbar links (with dropdowns)
export const bottomNavLinks = [
  {
    name: 'Personal Services',
    href: '/',
    dropdown: [
      {
        title: 'Accounts',
        items: [
          { name: 'Savings', href: '/savings' },
          { name: 'Checkings Account', href: '', 
            nestedDropdown: [
              { name: 'standard checking', href: '/checkings/standard' },
              { name: 'Interest Bearings', href: '/checkings/interest-bearing' },
              { name: 'Senior Savings', href: '/savings/senior-savings' },
              { name: 'YOuth Savings', href: '/savings/youth-savings' },
              { name: 'Joint Savings', href: '/savings/joint-savings' }
            ]
          },
          { name: 'Investment Account', href: '/investment', 
            nestedDropdown: [
              { name: 'BONDS', href: '/investment/bonds' },
              { name: 'E&S', href: '/investment/E&S' },
              { name: 'MFE', href: '/investment/MFE' },
             
            ]
           },
          { name: 'Retirement Account', href: '/',
            nestedDropdown: [
              { name: 'IRA ', href: '/retirement/IRA' },
              { name: 'Employee-Sponsore ', href: '/retirement/Employspon' },
              { name: 'indigo ', href: '/retirement/green' },
              { name: 'violet ', href: '/retirement/orange' }
            ]
           }
        ]
      },
    ]
  },
  {
    name: 'Business Banking',
    href: '/business',
    dropdown: [
      {
        title: 'Business Accounts',
        items: [
          { name: 'Business Checking', href: '/business/checking' },
          { name: 'Business Savings', href: '/business/savings' },
          { name: 'Merchant Account', href: '/business/merchant' },
          { name: 'Cooperate Account', href: '/business/cooperate',
            nestedDropdown: [
              { name: 'Large Cooperate', href: '/business/cooperate/large' },
              { name: 'Government Cooperate', href: '/business/cooperate/government' },
              { name: 'SME Cooperate', href: '/business/cooperate/sme' },
              { name: 'Retail Cooperate', href: '/business/cooperate/retail' }
            ]
          }
        ]
      },
      {
        title: 'Business Services',
        items: [
          { name: 'Payment Solutions', href: '/business/payment-solutions' },
          { name: 'Payroll Services', href: '/business/payroll' },
          { name: 'Business Loans', href: '/business/loans' }
        ]
      }
    ]
  },
  {
    name: 'Loans & Mortgages',
    href: '/loans',
    dropdown: [
      {
        title: 'Personal Loans',
        items: [
          { name: 'Secured Personal ', href: '/loans/personal/secured' },
          { name: 'Un-Secured Personal ', href: '/loans/personal/unsecured' },
          { name: 'PayDay ', href: '/loans/personal/payday' },

        ]
      },
      {
        title: 'Morgage Loans',
        items: [
          { name: 'Fixed Rate', href: '/loans/Morgage/Fixed' },
          { name: 'Un-Secured Personal ', href: '/loans/Morgage/unsecured' },


        ]
      },
      {
        title: 'Business Loans',
        items: [
          { name: 'Commercial Loans', href: '/loans/commercial' },
          { name: 'Small Business Loans', href: '/loans/small-business' },
          { name: 'Equipment Financing', href: '/loans/equipment' }
        ]
      }
    ]
  },
  {
    name: 'Investments',
    href: '/investments',
    dropdown: [
      {
        title: 'Investment Products',
        items: [
          { name: 'Stocks & ETFs', href: '/investments/stocks' },
          { name: 'Mutual Funds', href: '/investments/mutual-funds' },
          { name: 'Retirement Planning', href: '/investments/retirement' },
          { name: 'Wealth Management', href: '/investments/wealth' }
        ]
      },
      {
        title: 'Trading Services',
        items: [
          { name: 'Online Trading', href: '/investments/online-trading' },
          { name: 'Advisory Services', href: '/investments/advisory' },
          { name: 'Market Research', href: '/investments/research' }
        ]
      }
    ]
  },
  {
    name: 'Insurance',
    href: '/insurance',
    dropdown: [
      {
        title: 'Personal Insurance',
        items: [
          { name: 'Life Insurance', href: '/insurance/life' },
          { name: 'Health Insurance', href: '/insurance/health' },
          { name: 'Home Insurance', href: '/insurance/home' },
          { name: 'Auto Insurance', href: '/insurance/auto' }
        ]
      },
      {
        title: 'Business Insurance',
        items: [
          { name: 'Business Liability', href: '/insurance/business-liability' },
          { name: 'Commercial Property', href: '/insurance/commercial-property' },
          { name: 'Key Person Insurance', href: '/insurance/key-person' }
        ]
      }
    ]
  },

];

const navigationLinks = { topNavLinks, bottomNavLinks };
export default navigationLinks;