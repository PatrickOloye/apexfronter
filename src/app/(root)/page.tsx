'use client'

import HeroSection from '@/components/roots/landing-page/HeroSection'
import UnderHero from '@/components/roots/landing-page/UnderHero'
import StructuredTradeFinance from '../../components/roots/landing-page/TradeFinnance';
import React from 'react'
import InnovativeBankingSection from '@/components/roots/landing-page/BankingSection';
import Div2SIdes from '@/components/roots/landing-page/div-2sides';
import Banner from '@/components/roots/landing-page/ui/grokImage';
import FinancialInsights from '@/components/roots/landing-page/News';
import NewsletterSubscription from '@/components/roots/landing-page/Subscription';

const page = () => {
  return (
    <>
    <HeroSection/>
    <UnderHero/>
    <StructuredTradeFinance/>
    <FinancialInsights/>
    <InnovativeBankingSection />
    <Banner/>
    <Div2SIdes/>
    <NewsletterSubscription/>
    </>
  )
}

export default page