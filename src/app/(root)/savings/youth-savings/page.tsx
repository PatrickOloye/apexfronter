import React from 'react';
import AccountHero from '@/components/roots/savings/Basic-savings.tsx/ui/Hero';
import FeatureGrid from '@/components/roots/savings/Basic-savings.tsx/ui/Features';
import DetailedExplanation from '@/components/roots/savings/Basic-savings.tsx/ui/DetailedExplanation';
import AccountDetailsSection from '@/components/roots/savings/Basic-savings.tsx/ui/AccountDetailsSection';
import ComparisonTable from '@/components/roots/savings/Basic-savings.tsx/ui/ComparismTable';
import FAQSection from '@/components/roots/savings/Basic-savings.tsx/ui/CallToAction';
import AccountTypesSection from '@/components/roots/landing-page/ui/AccountTypeSection';

const YouthSavingsAccount: React.FC = () => {
    const heroData = {
        accountType: "Youth",
        description: "A financial learning platform for young savers, combining education with practical money management tools under parental guidance.",
        interestRate: 2.5
    };

    const features = [
        {
            icon: "👨‍👦",
            title: "Parental Oversight",
            description: "Joint account structure allows adults to monitor and guide financial activities"
        },
        {
            icon: "🎓",
            title: "Financial Education",
            description: "Interactive learning materials to teach money management fundamentals"
        },
        {
            icon: "🏆",
            title: "Achievement Rewards",
            description: "Earn badges and bonuses for reaching savings milestones"
        },
        {
            icon: "💸",
            title: "Allowance Tools",
            description: "Special features to help manage regular allowance payments"
        },
        {
            icon: "📊",
            title: "Visual Trackers",
            description: "Child-friendly progress charts to visualize savings growth"
        },
        {
            icon: "🔐",
            title: "Secure Environment",
            description: "Full regulatory protection for young savers' deposits"
        }
    ];

    const explanation = {
        title: "Building Financial Literacy from an Early Age",
        paragraphs: [
            "Our Youth Savings Account transforms basic banking into an engaging educational experience. Designed specifically for minors, this program introduces financial concepts through practical application in a safe, controlled environment.",
            "The account structure encourages regular saving habits while teaching important lessons about budgeting and goal setting. Children watch their money grow while parents maintain appropriate oversight through the joint account relationship.",
            "Special youth-oriented features include simplified statements, colorful progress trackers, and age-appropriate financial lessons. These tools help demystify banking concepts while making money management approachable for young minds.",
            "We recommend this account for families seeking to establish healthy financial patterns during formative years. The combination of practical banking with educational support creates a strong foundation for lifelong fiscal responsibility."
        ],
        images: [
            "/landing-page/youth-saving.jpg",
            "/landing-page/parent-child-banking.jpg"
        ] as [string, string]
    };

    const accountTypes = [
        {
          title: "Joint Savings",
          description: "Flexible access to your funds with competitive interest rates for everyday financial needs.",
          cta: "Learn More"
        },
        {
          title: "High-Yield Savings",
          description: "Maximize your returns with our premium savings option offering higher interest rates.",
          cta: "Discover Benefits"
        },
        {
          title: "Youth Savings",
          description: "Help children develop healthy financial habits early with accounts designed for young savers.",
          cta: "Start Early"
        },
        {
          title: "Basic Savings",
          description: "Help children develop healthy financial habits early with accounts designed for young savers.",
          cta: "Start Early"
        },
        {
          title: "Senior Savings",
          description: "Maximize your returns with our premium savings option offering higher interest rates.",
          cta: "Discover Benefits"
        },
        {
          title: "Education Savings",
          description: "Help children develop healthy financial habits early with accounts designed for young savers.",
          cta: "Start Early"
        },
       
      ];

    const comparisons = [
        {
            feature: "Minimum Age",
            currentAccount: "5 years",
            basic: "13 years",
            premium: "18 years"
        },
        {
            feature: "Interest Rate",
            currentAccount: "2.5%",
            basic: "1.5%",
            premium: "3.8%"
        },
        {
            feature: "Account Control",
            currentAccount: "Parent + Child",
            basic: "Individual",
            premium: "Individual"
        },
        {
            feature: "Educational Content",
            currentAccount: "Full curriculum",
            basic: "Basic guides",
            premium: "Advanced tools"
        }
    ];

    const faqs = [
        {
            question: "At what age can my child open this account?",
            answer: "Children as young as 5 can participate with a parent or legal guardian as joint account holder."
        },
        {
            question: "What educational resources are included?",
            answer: "We provide interactive games, printable worksheets, video tutorials, and parent guides covering money basics to advanced concepts."
        },
        {
            question: "Can the account be accessed digitally?",
            answer: "Yes, through our secure youth banking app with parental controls and spending limits."
        },
        {
            question: "What happens when my child turns 18?",
            answer: "The account automatically converts to a standard savings account, with options to upgrade to other products."
        }
    ];

    return (
        <div className="youth-savings-page">
            <AccountHero {...heroData} />
            
            <FeatureGrid features={features} />
            
            <DetailedExplanation 
                title={explanation.title}
                paragraphs={explanation.paragraphs}
                images={explanation.images}
            />
            
            <AccountDetailsSection 
                eligibility={[
                    'Must have parent/guardian as joint owner',
                    'Available for ages 5-17',
                    'Valid government ID required for both parties'
                ]}
                benefits={[
                    'No monthly maintenance fees',
                    'Special youth interest rate bonus',
                    'Financial education portal access',
                    'Customizable savings goals'
                ]}
                usageTips={[
                    'Set up automatic allowance deposits',
                    'Review statements together monthly',
                    'Use savings goals to teach delayed gratification',
                    'Celebrate financial milestones'
                ]}
            />
            
            <ComparisonTable
                accountType="Youth Savings"
                comparisons={comparisons}
            />
            <AccountTypesSection  accountTypes={accountTypes}/>
            
            <FAQSection faqs={faqs} />
        </div>
    );
};

export default YouthSavingsAccount;