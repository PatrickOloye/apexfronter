"use client";

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const DEFAULT_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'NGN', 'ZAR', 'GHS', 'KES'];

interface ForexResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

// Mock historical data generator
const generateHistory = (base: string, target: string, currentRate: number) => {
  const data = [];
  let rate = currentRate || 1;
  const days = 7;
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    // Random fluctuation within 2%
    const change = (Math.random() - 0.5) * 0.04; 
    rate = rate * (1 + change);
    data.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      rate: Number(rate.toFixed(4)),
    });
  }
  return data;
};

const ForexWidget = () => {
  const [base, setBase] = useState('USD');
  const [target, setTarget] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currencies = useMemo(() => {
    const set = new Set([base, ...DEFAULT_CURRENCIES, target]);
    return Array.from(set).sort();
  }, [base, target]);

  const fetchRates = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?from=${base}`);
      if (!response.ok) {
        throw new Error('Failed to fetch forex rates');
      }
      const data: ForexResponse = await response.json();
      setRates(data.rates || {});
      setLastUpdated(data.date);
    } catch (err: any) {
      setError(err.message || 'Unable to load forex rates');
      setRates({});
    } finally {
      setLoading(false);
    }
  }, [base]);

  useEffect(() => {
    fetchRates();
  }, [base, fetchRates]);

  const graphData = useMemo(() => {
    const currentRate = rates[target] || 1;
    return generateHistory(base, target, currentRate);
  }, [base, target, rates]);

  const displayedRates = currencies
    .filter((currency) => currency !== base)
    .map((currency) => ({
      currency,
      rate: rates[currency],
      converted: rates[currency] ? rates[currency] * amount : undefined,
    }))
    .filter((row) => row.rate !== undefined);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Converter & Graph Section */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Forex Exchange</h2>
            <p className="text-slate-500 text-sm">Real-time exchange rates & trends</p>
          </div>
          <button
            onClick={fetchRates}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
            title="Refresh Rates"
          >
            <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Converter Inputs */}
        <div className="bg-slate-50 rounded-2xl p-5 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4 relative">
            <div className="flex-1 w-full">
              <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">From</label>
              <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20">
                <input
                  type="number"
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="flex-1 px-4 py-3 text-lg font-bold text-slate-800 focus:outline-none"
                />
                <select
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  className="bg-slate-100 border-l border-slate-200 px-3 font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  {currencies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center -my-2 md:my-0 z-10">
              <button 
                onClick={() => {
                  const temp = base;
                  setBase(target);
                  setTarget(temp);
                }}
                className="w-10 h-10 bg-blue-600 outline-4 outline-slate-50 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>

            <div className="flex-1 w-full">
              <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">To</label>
              <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="flex-1 px-4 py-3 text-lg font-bold text-slate-800 bg-slate-50/50">
                  {rates[target] ? (rates[target] * amount).toFixed(2) : '...'}
                </div>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="bg-slate-100 border-l border-slate-200 px-3 font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  {currencies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className="text-xs font-medium text-slate-400">
              1 {base} = {rates[target]?.toFixed(4)} {target} • Last updated {lastUpdated || '...'}
            </span>
          </div>
        </div>

        {/* Graph Area */}
        <div className="flex-1 min-h-[300px] w-full">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
            {base} to {target} Trend
          </h3>
          <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}}
                    dy={10}
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    axisLine={false} 
                    tickLine={false}
                    tick={{fill: '#94a3b8', fontSize: 12}}
                    width={50}
                    tickFormatter={(value) => value.toFixed(2)}
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRate)" 
                  />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Side List */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-slate-100 p-6 overflow-hidden flex flex-col h-[52rem] lg:h-auto">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Live Rates ({base})</h3>
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-3">
            {displayedRates.map((row) => (
               <div key={row.currency} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group cursor-pointer" onClick={() => setTarget(row.currency)}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      {row.currency.substring(0, 2)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-700">{row.currency}</div>
                      <div className="text-xs text-slate-400">1 {base} = {row.rate?.toFixed(4)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                     <div className="font-bold text-slate-800">{row.converted?.toFixed(2)}</div>
                     <div className="text-xs text-emerald-500 font-medium">+0.0%</div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForexWidget;
