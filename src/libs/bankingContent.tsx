// src/lib/bankingContent.ts

export interface BankingCardContent {
    id: number;
    title: string;
    description: string;
    image: string; // Path to the image (e.g., in public or assets folder)
    link: string; // URL for the "Read more" button
  }
  
  export const bankingContent: BankingCardContent[] = [
    {
      id: 1,
      title: 'Open an Account',
      description: 'Need an account? Open an account for your business, yourself, or your child in minutes.',
      image: '/landing-page/account-opening.jpg', // Path to image in public folder or assets
      link: '/open-account',
    },
    {
      id: 2,
      title: 'GTC Crea8',
      description: 'Free with zero SMS charges. Free ATM transfer instantly with a GTC Crea8 account.',
      image: '/banking-gtc-crea8.jpg',
      link: '/gtc-crea8',
    },
    {
      id: 3,
      title: 'Quick Credit',
      description: 'Get up to N0 million in credit and pay back in 6-12 months at 2.95% monthly interest rate. No hidden fees.',
      image: '/banking-quick-credit.jpg',
      link: '/quick-credit',
    },


  ];