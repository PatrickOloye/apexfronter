'use client';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { LoanFeatureCard } from '@/components/roots/Loan/personal/payday/FeaturesCard';
import { ComparisonTable } from '@/components/roots/Loan/personal/payday/Comparism';
import { StepProgressCard } from '@/components/roots/Loan/personal/payday/Steps';
import { ExpandableContent } from '@/components/roots/Loan/personal/payday/Expandable';
import { TestimonialCarousel } from '@/components/roots/Loan/personal/payday/Testimonials';
import { FAQSection } from '@/components/roots/Loan/personal/payday/FQ';
import { CTASection } from '@/components/roots/Loan/personal/payday/CTA';


// Icons (replace with your preferred icon library like heroicons, etc.)
const Icons = {
  QuickCash: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
    </svg>
  ),
  NoCredit: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  ),
  EasyApplication: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  ),
  HighRate: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  ),
  Apply: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <polyline points="17 11 19 13 23 9"></polyline>
    </svg>
  ),
  GetApproved: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  ),
  ReceiveFunds: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M8 9v-1h8v1"></path>
      <path d="M16 15v1H8v-1"></path>
    </svg>
  ),
  RepayLoan: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  ChevronDown: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  Cash: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M6 12h.01M18 12h.01"></path>
    </svg>
  ),
  Check: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )
};

export default function PaydayLoanPage() {
  // Sample data for comparison table
  const comparisonFeatures = [
    {
      name: "Loan Term",
      paydayLoan: "1–4 weeks",
      personalLoan: "1–7 years"
    },
    {
      name: "Interest Rate",
      paydayLoan: "Very High (often over 400% APR)",
      personalLoan: "Lower (typically 6%–36% APR)"
    },
    {
      name: "Loan Amount",
      paydayLoan: "Small ($100–$1,000)",
      personalLoan: "Larger ($1K–$50K)"
    },
    {
      name: "Credit Requirements",
      paydayLoan: "Minimal",
      personalLoan: "Moderate to Good"
    },
    {
      name: "Risk to Borrower",
      paydayLoan: "High (debt cycle risk)",
      personalLoan: "Moderate (credit impact)"
    },
    {
      name: "Funding Speed",
      paydayLoan: "Fast (same-day possible)",
      personalLoan: "Fast (1–3 business days)"
    }
  ];

  // Sample data for application steps
  const applicationSteps = [
    {
      title: "Apply Online or In-Person",
      description: "Complete our simple application process via our mobile app or website. You'll need basic personal information, proof of income, bank account details, and identification.",
      icon: Icons.Apply
    },
    {
      title: "Get Approved",
      description: "We review your application based on eligibility criteria such as income level, employment status, and banking history. Approval is generally fast since these loans are short-term and unsecured.",
      icon: Icons.GetApproved
    },
    {
      title: "Receive Funds",
      description: "Once approved, the money is typically deposited into your bank account within minutes to 24 hours, giving you quick access to needed funds.",
      icon: Icons.ReceiveFunds
    },
    {
      title: "Repay the Loan",
      description: "On your next payday, we'll automatically withdraw the full amount—including fees—from your bank account. Some extensions are available if needed.",
      icon: Icons.RepayLoan
    }
  ];

  // Sample data for testimonials
  const testimonials = [
    {
      quote: "When my car broke down, I needed money fast. Apex Finance helped me get a payday loan quickly without hassle. Their transparent process made everything clear.",
      author: "Michael J.",
      role: "Retail Manager",
      rating: 5
    },
    {
      quote: "I was skeptical about payday loans, but Apex Finance walked me through all my options. I appreciated their honesty about the costs involved.",
      author: "Sarah T.",
      role: "Healthcare Worker",
      rating: 4
    },
    {
      quote: "The repayment tracking feature in the app really helped me stay on top of my loan. I never missed a payment thanks to their reminder system.",
      author: "David R.",
      role: "Freelance Designer",
      rating: 5
    }
  ];

  // Sample data for FAQs
  const faqs = [
    {
      question: "Are payday loans legal?",
      answer: "Yes, but regulations vary by state. Some states limit loan amounts, fees, or rollovers. At Apex Finance, we stay compliant with all state regulations to protect our customers."
    },
    {
      question: "Will a payday loan affect my credit score?",
      answer: "Typically, no—unless you default and the debt is sent to collections. Apex Finance doesn't perform a hard credit check for approval, which means applying won't impact your credit score."
    },
    {
      question: "Can I get a payday loan with bad credit?",
      answer: "Yes, since most lenders, including Apex Finance, don't perform a hard credit check. We focus more on your current income and ability to repay rather than past credit history."
    },
    {
      question: "What happens if I can't repay on time?",
      answer: "You may be able to extend the loan, but this usually incurs additional fees. We recommend contacting our customer support team immediately if you anticipate difficulty making your payment."
    },
    {
      question: "Are there limits on how many payday loans I can take?",
      answer: "Yes, many states limit the number of outstanding loans at once. These regulations help protect consumers from falling into debt cycles. Our system will automatically check your eligibility based on your state's rules."
    }
  ];

  // Sample data for CTA features
  const ctaFeatures = [
    {
      title: "24/7 Account Access",
      description: "Monitor your loan status anytime, anywhere with our secure mobile app.",
      icon: Icons.Check
    },
    {
      title: "Transparent Fees",
      description: "No hidden charges, ever. We clearly disclose all costs upfront.",
      icon: Icons.Check
    },
    {
      title: "Responsible Lending",
      description: "We follow best practices to ensure you only borrow what you can afford.",
      icon: Icons.Check
    }
  ];

  return (
    <>
      <Head>
        <title>Payday Loans | Apex Finance</title>
        <meta name="description" content="Learn about payday loans at Apex Finance - short-term financial solutions with transparent terms and responsible lending practices." />
      </Head>
      
      <main className="bg-gray-50">
        {/* Main content starts below hero section */}
        <div className="container mx-auto px-4 py-12">
          {/* Intro Section */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Understanding Payday Loans: A Short-Term Financial Solution</h1>
            <p className="text-xl text-gray-600">
              At Apex Finance, we believe that financial empowerment starts with knowledge. 
              Learn everything you need to know about payday loans before deciding if they&apos;re right for you.
            </p>
          </div>
          
          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <LoanFeatureCard
              title="Quick Access to Cash"
              description="Ideal for covering urgent needs when waiting for a paycheck isn't an option."
              icon={Icons.QuickCash}
              color="blue-600"
            />
            <LoanFeatureCard
              title="No Credit Check Required"
              description="Many lenders, including Apex Finance, do not require a hard credit pull for approval."
              icon={Icons.NoCredit}
              color="blue-600"
            />
            <LoanFeatureCard
              title="Easy Application Process"
              description="Most payday loan applications can be completed online in just a few minutes."
              icon={Icons.EasyApplication}
              color="blue-600"
            />
            <LoanFeatureCard
              title="Higher Interest Rates"
              description="Annual percentage rates (APRs) often exceed 400%, making them one of the most expensive forms of borrowing."
              icon={Icons.HighRate}
              color="blue-600"
            />
            <LoanFeatureCard
              title="Short Repayment Term"
              description="Usually 14–30 days, designed to be repaid on your next payday."
              icon={Icons.RepayLoan}
              color="blue-600"
            />
            <LoanFeatureCard
              title="Small Loan Amounts"
              description="Typically $100–$1,000, varies by state regulations and lender policies."
              icon={Icons.Cash}
              color="blue-600"
            />
          </div>
          
          {/* Comparison Table Section */}
          <div className="mb-16">
            <ComparisonTable
              title="Payday Loans vs. Other Personal Loans"
              subtitle="Understanding the key differences before making a decision"
              features={comparisonFeatures}
              accentColor="blue-600"
            />
          </div>
          
          {/* Process Steps Section */}
          <div className="mb-16">
            <StepProgressCard
              title="How Do Payday Loans Work?"
              subtitle="Follow our simple 4-step process to get the funds you need"
              steps={applicationSteps}
              accentColor="blue-600"
            />
          </div>
          
          {/* Who Uses Section with Expandable Content */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Who Uses Payday Loans?</h2>
              <p className="text-xl text-gray-600">Payday loans serve various individuals in specific financial situations</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <ExpandableContent
                title="Working Adults with Irregular Income"
                defaultExpanded={true}
                colorScheme="blue-600"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <p className="mb-4">
                      Freelancers, gig workers, or those paid on commission often experience inconsistent cash flow. 
                      During lean weeks or while waiting for payments to clear, a payday loan can help bridge the gap.
                    </p>
                    <p>
                      These individuals typically have income coming, but timing mismatches between bills and payments 
                      can create temporary shortfalls that payday loans help address.
                    </p>
                  </div>
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image 
                      src="/api/placeholder/400/300" 
                      alt="Freelancer working on laptop" 
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </ExpandableContent>
              
              <ExpandableContent
                title="Low-to-Middle Income Earners"
                colorScheme="blue-600"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <p className="mb-4">
                      People living paycheck to paycheck may rely on payday loans to cover essentials like rent, 
                      groceries, or utilities when unexpected expenses arise.
                    </p>
                    <p>
                      For these borrowers, even small financial setbacks can create significant hardships, 
                      making payday loans an accessible—though expensive—source of emergency funds.
                    </p>
                  </div>
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image 
                      src="/api/placeholder/400/300" 
                      alt="Person reviewing bills at kitchen table" 
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </ExpandableContent>
              
              <ExpandableContent
                title="Those with Poor Credit"
                colorScheme="blue-600"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <p className="mb-4">
                      Individuals who don&apos;t qualify for traditional loans or credit cards may see payday loans as their only option.
                      With minimal credit requirements, they provide access to funds when other doors are closed.
                    </p>
                    <p>
                      At Apex Finance, we help customers understand the true cost of borrowing while working to improve their 
                      financial health for the future.
                    </p>
                  </div>
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image 
                      src="/api/placeholder/400/300" 
                      alt="Person looking concerned while checking credit score on phone" 
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </ExpandableContent>
              
              <ExpandableContent
                title="Emergency Situations"
                colorScheme="blue-600"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <p className="mb-4">
                      Unexpected expenses like car repairs, medical bills, or last-minute travel can prompt someone to take out a payday loan.
                      When these situations can&apos;t wait until the next paycheck, payday loans provide immediate relief.
                    </p>
                    <p>
                      These borrowers typically use payday loans as a last resort after exhausting other options like savings or help from family.
                    </p>
                  </div>
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image 
                      src="/api/placeholder/400/300" 
                      alt="Car broken down on roadside" 
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </ExpandableContent>
            </div>
          </div>
          
          {/* Testimonials Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
              <p className="text-xl text-gray-600">Read about real experiences from Apex Finance customers</p>
            </div>
            
            <TestimonialCarousel
              testimonials={testimonials}
              colorScheme="blue-600"
            />
          </div>
          
          {/* FAQ Section */}
          <div className="mb-16">
            <FAQSection
              title="Frequently Asked Questions"
              subtitle="Get answers to common questions about payday loans"
              faqs={faqs}
              colorScheme="blue-600"
            />
          </div>
          
          {/* CTA Section */}
          <div>
            <CTASection
              title="Ready to Make an Informed Decision?"
              subtitle="Download the Apex Finance App today and learn how to apply for a payday loan—or explore alternative solutions that may better suit your needs."
              primaryButtonText="Apply Now"
              primaryButtonUrl="/apply"
              secondaryButtonText="Explore Alternatives"
              secondaryButtonUrl="/alternatives"
              features={ctaFeatures}
              imageSrc="/api/placeholder/600/800"
              imageAlt="Person using Apex Finance mobile app"
              colorScheme="blue-600"
            />
          </div>
        </div>
      </main>
    </>
  );
}