import React from 'react';
import AccountHero from '@/components/roots/savings/Basic-savings.tsx/ui/Hero';
import FeatureGrid from '@/components/roots/savings/Basic-savings.tsx/ui/Features';
import DetailedExplanation from '@/components/roots/savings/Basic-savings.tsx/ui/DetailedExplanation';
import AccountDetailsSection from '@/components/roots/savings/Basic-savings.tsx/ui/AccountDetailsSection';
import ComparisonTable from '@/components/roots/savings/Basic-savings.tsx/ui/ComparismTable';
import FAQSection from '@/components/roots/savings/Basic-savings.tsx/ui/CallToAction';
import AccountTypesSection from '@/components/roots/landing-page/ui/AccountTypeSection';

const EducationSavingsAccount: React.FC = () => {
    const heroData = {
        accountType: "Education",
        description: "Secure your child's academic future with our dedicated savings plan offering tax benefits and long-term growth potential.",
        interestRate: [3.2, 3.8] // Rotating rates for promotional periods
    };

    const features = [
        {
            icon: "🎓",
            title: "Tax-Advantaged Growth",
            description: "Potential tax benefits on contributions and tax-free earnings for qualified expenses"
        },
        {
            icon: "🔄",
            title: "Automated Contributions",
            description: "Schedule regular transfers from your primary account effortlessly"
        },
        {
            icon: "🔐",
            title: "Purpose-Locked Funds",
            description: "Savings remain dedicated to education until the beneficiary reaches college age"
        },
        {
            icon: "📈",
            title: "Investment Options",
            description: "Choose from conservative to growth-oriented portfolio strategies"
        },
        {
            icon: "👨‍👩‍👧‍👦",
            title: "Multi-Beneficiary",
            description: "Flexibility to transfer unused funds to siblings or other family members"
        },
        {
            icon: "🌍",
            title: "Global Education",
            description: "Funds can be used at eligible institutions worldwide"
        }
    ];

    const explanation = {
        title: "Planning for Educational Success",
        paragraphs: [
            "Our Education Savings Account provides a structured pathway to fund academic aspirations. Unlike conventional savings vehicles, this specialized account aligns with educational timelines and offers financial incentives to encourage consistent saving behavior.",
            "The account's potential tax advantages vary by jurisdiction but typically include either tax-deductible contributions or tax-free withdrawals for approved educational costs. These benefits effectively reduce the net cost of saving when utilized strategically.",
            "Funds accumulate in a protected environment, with withdrawal restrictions ensuring the money serves its intended purpose. Account holders can monitor growth through detailed quarterly statements and online dashboards that project future values based on current saving patterns.",
            "Ideal for parents with newborns through teenagers, this account adapts to changing educational landscapes. Whether saving for private schooling, university tuition, or vocational training, the ESA provides financial scaffolding for academic achievement."
        ],
        images: [
            "/landing-page/education-1.jpg",
            "/landing-page/education-2.jpg"
        ]
    };

    const comparisons = [
        {
            feature: "Tax Benefits",
            currentAccount: "Yes",
            basic: "No",
            premium: "Limited"
        },
        {
            feature: "Withdrawal Flexibility",
            currentAccount: "Education-only",
            basic: "Unrestricted",
            premium: "Partial restrictions"
        },
        {
            feature: "Contribution Limits",
            currentAccount: "Higher limits",
            basic: "Standard limits",
            premium: "Increased limits"
        },
        {
            feature: "Age Restrictions",
            currentAccount: "Until college",
            basic: "None",
            premium: "Varies"
        }
    ];

    
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
          title: "youth Savings",
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

    const faqs = [
        {
            question: "Can grandparents contribute to an ESA?",
            answer: "Absolutely. Family members beyond parents can contribute, though tax benefits typically apply only to the account owner."
        },
        {
            question: "What happens if my child receives a scholarship?",
            answer: "Scholarship funds may allow penalty-free withdrawals up to the scholarship amount, though regular taxes may apply."
        },
        {
            question: "Are ESA funds affected by financial aid applications?",
            answer: "Impact varies by institution, but ESAs are generally treated as parental assets which have less effect than student-owned funds."
        },
        {
            question: "Can ESA funds cover education-related technology?",
            answer: "Yes, qualified expenses often include computers, internet access, and required software for enrolled students."
        }
    ];

    return (
        <main>
            <AccountHero {...heroData} />
            
            <FeatureGrid features={features} />
            
            <DetailedExplanation 
                title={explanation.title}
                paragraphs={explanation.paragraphs}
                images={[
                    "/landing-page/altpro.jpg",
                    "/landing-page/altbiz.jpg"
                ]}
            />
            
            <AccountDetailsSection 
                eligibility={[
                    'Must be opened by adult for minor beneficiary',
                    'Valid identification for account owner and beneficiary',
                    'Social security/Tax ID numbers for both parties',
                    'Minimum initial deposit may apply'
                ]}
                benefits={[
                    'Potential reduction in taxable income',
                    'Tax-free growth of investment earnings',
                    'Protection from creditors in many jurisdictions',
                    'Flexible investment options to match risk tolerance'
                ]}
                usageTips={[
                    'Begin contributions as early as possible',
                    'Increase contributions with income growth',
                    'Coordinate with other education funding sources',
                    'Review investment choices annually'
                ]}
            />
            
            <ComparisonTable 
                accountType="Education Savings"
                comparisons={comparisons}
            />
            <AccountTypesSection  accountTypes={accountTypes}/>
            <FAQSection faqs={faqs} />
        </main>
    );
};

export default EducationSavingsAccount;